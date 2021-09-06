/** @module src/getGjson */
import { checkGr } from './checkGr.js'
import { getCentroid } from './getCentroid.js'
import proj4 from 'proj4'
import projections from './projections.js'
import km100s from './km100.js'

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
 * the shape of the required 'symbol', this function returns a GeoJson pth geometry object.
 * @param {string} gr - the grid reference.
 * @param {string} toProjection - two letter code specifying the required output CRS.
 * @param {string} shape - string specifying the requested output shape type.
 * @param {number} scale - number between 0 and 1 to scale the output object.
 * @returns {object} - a GeoJson path geometry object.
 * @todo Extend to return all symbol types
 */
export function getGjson (gr, toProjection, shape, scale) {

  const size = scale ? scale : 1 
  const grType = checkGr(gr)
  const km100 = km100s[grType.prefix]
  const centroid = getCentroid(gr, km100.proj).centroid
  const xmin = centroid[0] - grType.precision / 2 * size
  const xmax = centroid[0] + grType.precision / 2 * size
  const ymin = centroid[1] - grType.precision / 2 * size
  const ymax = centroid[1] + grType.precision / 2 * size
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
    const rad = grType.precision / 2 * size
    coords = [[]]
    for(let deg  = 0; deg <= 360;  deg += 15){
      const angle = deg * Math.PI / 180
      const x = rad * Math.cos(angle) + centroid[0]
      const y = rad * Math.sin(angle) + centroid[1]
      coords[0].push(convertCoords(km100.proj, toProjection, x, y))
    }
  } else if (shape === "circlerad") {
    coords = [[
      convertCoords(km100.proj, toProjection, centroid[0], centroid[1]),
      convertCoords(km100.proj, toProjection, xmax, centroid[1])
    ]]
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
  } else if (shape === "point") {
    type = "Point"
    coords = convertCoords(km100.proj, toProjection, centroid[0], centroid[1])
  }

  return {
    "type": type,
    "coordinates": coords
  }
}
