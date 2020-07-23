/** @module src/getGjson */
import { checkGr } from './checkGr'
import { getCentroid } from './getCentroid'
import proj4 from 'proj4'
import projections from './projections'
import km100s from './km100'

function convertCoords(fromProjection, toProjection, x, y) {

  let outCoords
  // If the required output projection does not match the projection of the input GR
  // then use proj4 to reproject
  if (toProjection !== fromProjection)  {
    outCoords = proj4(projections[fromProjection].proj4, projections[toProjection].proj4, [x, y])
  } else {
    outCoords = [x, y]
  }
  return outCoords
}

/**
 * Given a grid reference (British National Grid, Irish Grid or UTM zone 30N shorthand),
 * a two-letter code defining the requested output projection, and a string indicating
 * the shape of the required 'symbol', this function returns a GeoJson feature object.
 * @param {string} gr - the grid reference.
 * @param {string} toProjection - two letter code specifying the required output CRS.
 * @param {string} shape - string specifying the requested output shape type.
 * @returns {object} - a GeoJson Feature object.
 * @todo Extend to return all symbol types
 */
export function getGjson (gr, toProjection, shape) {

  const grType = checkGr(gr)
  const km100 = km100s[grType.prefix]
  const centroid = getCentroid(gr, km100.proj).centroid
  const xmin = centroid[0] - grType.precision / 2
  const xmax = centroid[0] + grType.precision / 2
  const ymin = centroid[1] - grType.precision / 2
  const ymax = centroid[1] + grType.precision / 2
  const xmid = xmin + (xmax-xmin)/2
  const ymid = ymin + (ymax-ymin)/2

  let coords
  let type = "Polygon"
  if (shape === "square") {
    coords = [[
      convertCoords(km100.proj, toProjection, xmin, ymin),
      convertCoords(km100.proj, toProjection, xmax, ymin),
      convertCoords(km100.proj, toProjection, xmax, ymax),
      convertCoords(km100.proj, toProjection, xmin, ymax),
      convertCoords(km100.proj, toProjection, xmin, ymin)
    ]]
  } else if (shape === "triangle-up") {
    coords = [[
      convertCoords(km100.proj, toProjection, xmin, ymin),
      convertCoords(km100.proj, toProjection, xmax, ymin),
      convertCoords(km100.proj, toProjection, xmid, ymax),
      convertCoords(km100.proj, toProjection, xmin, ymin)
    ]]
  } else if (shape === "triangle-down") {
    coords = [[
      convertCoords(km100.proj, toProjection, xmid, ymin),
      convertCoords(km100.proj, toProjection, xmax, ymax),
      convertCoords(km100.proj, toProjection, xmin, ymax),
      convertCoords(km100.proj, toProjection, xmid, ymin)
    ]]
  } else if (shape === "diamond") {
    coords = [[
      convertCoords(km100.proj, toProjection, xmid, ymin),
      convertCoords(km100.proj, toProjection, xmax, ymid),
      convertCoords(km100.proj, toProjection, xmid, ymax),
      convertCoords(km100.proj, toProjection, xmin, ymid),
      convertCoords(km100.proj, toProjection, xmid, ymin)
    ]]
  } else if (shape === "circle") {
    const rad = grType.precision / 2
    coords = [[]]
    for(let deg  = 0; deg <= 360;  deg += 15){
      const angle = deg * Math.PI / 180
      const x = rad * Math.cos(angle) + centroid[0]
      const y = rad * Math.sin(angle) + centroid[1]
      coords[0].push(convertCoords(km100.proj, toProjection, x, y))
    }
  } else if (shape === "cross") {
    type = "MultiLineString"
    coords = [
      [convertCoords(km100.proj, toProjection, xmin, ymin),
      convertCoords(km100.proj, toProjection, xmax, ymin),
      convertCoords(km100.proj, toProjection, xmax, ymax),
      convertCoords(km100.proj, toProjection, xmin, ymax),
      convertCoords(km100.proj, toProjection, xmin, ymin)],
      [convertCoords(km100.proj, toProjection, xmin, ymin),
      convertCoords(km100.proj, toProjection, xmax, ymax)],
      [convertCoords(km100.proj, toProjection, xmin, ymax),
      convertCoords(km100.proj, toProjection, xmax, ymin)]
    ]
  }

  return {
      "type": "Feature",
      "geometry": {
          "type": type,
          "coordinates": coords
      }
    }
}
