/** @module src/getCentroid */
import { checkGr } from './checkGr'
import proj4 from 'proj4'
import projections from './projections'
import qOffsets from './quadrants'
import tOffsets from './tetrads'
import km100s from './km100'

/**
 * Given a grid reference (British National Grid, Irish Grid or UTM zone 30N shorthand),
 * and a two-letter code defining the requested output projection, this function
 * returns the centroid of the grid reference.
 * @param {string} gr - the grid reference
 * @param {string} toProjection - two letter code specifying the required output CRS.
 * @returns {object} - of the form {centroid: [x, y], proj: 'code'}; x and y are 
 * coordinates in CRS specified by toProjection. The proj code indicates the source projection.
 */
export function getCentroid (gr, toProjection) {

  let x, y, outCoords, suffix
  const grType = checkGr(gr)
  const prefix = grType.prefix
  const km100 = km100s[prefix]

  switch(grType.precision) {
    case 100000:
      x = km100.x * 100000 + 50000
      y = km100.y * 100000 + 50000
      break;
    case 10000:
      x = km100.x * 100000 + Number(gr.substr(prefix.length,1)) * 10000 + 5000
      y = km100.y * 100000 + Number(gr.substr(prefix.length+1,1)) * 10000 + 5000
      break;
    case 5000:
      suffix = gr.substr(prefix.length+2,2).toLowerCase()
      x = km100.x * 100000 + Number(gr.substr(prefix.length,1)) * 10000 + qOffsets[suffix].x + 2500
      y = km100.y * 100000 + Number(gr.substr(prefix.length+1,1)) * 10000 + qOffsets[suffix].y + 2500
      break
    case 2000:
      suffix = gr.substr(prefix.length+2,1).toLowerCase()
      x = km100.x * 100000 + Number(gr.substr(prefix.length,1)) * 10000 + tOffsets[suffix].x + 1000
      y = km100.y * 100000 + Number(gr.substr(prefix.length+1,1)) * 10000 + tOffsets[suffix].y + 1000
      break
    case 1000:
      x = km100.x * 100000 + Number(gr.substr(prefix.length,2)) * 1000 + 500
      y = km100.y * 100000 + Number(gr.substr(prefix.length+2,2)) * 1000 + 500
      break
    case 100:
      x = km100.x * 100000 + Number(gr.substr(prefix.length,3)) * 100 + 50
      y = km100.y * 100000 + Number(gr.substr(prefix.length+3,3)) * 100 + 50
      break
    case 10:
      x = km100.x * 100000 + Number(gr.substr(prefix.length,4)) * 10 + 5
      y = km100.y * 100000 + Number(gr.substr(prefix.length+4,4)) * 10 + 5
      break
    default:
      x = km100.x * 100000 + Number(gr.substr(prefix.length,5)) + 0.5
      y = km100.y * 100000 + Number(gr.substr(prefix.length+5,5)) + 0.5
  }

  // If the required output projection does not match the projection of the input GR
  // then use proj4 to reproject
  if (toProjection !== km100.proj)  {
    outCoords = proj4(projections[km100.proj].proj4, projections[toProjection].proj4, [x, y])
  } else {
    outCoords = [x, y]
  }
  return {
    centroid: outCoords,
    proj: km100.proj
  }
}
