/** @module src/getGrFromCoords */
import proj4 from 'proj4'
import { pntToArea } from './pntToArea.js'
import projections from './projections.js'
import { a100km } from './km100.js'
import qOffsets from './quadrants.js'
import tOffsets from './tetrads.js'

/**
 * Given a coordinate pair (British National Grid, Irish Grid, UTM zone 30N shorthand or WGS84),
 * a two-letter code defining the projection of the passed in coordinates,
 * a two-letter code defining the required output projection, and an array of numbers
 * indicating the required output precisions, returns an object with the grid references
 * at the requested precisions in the requested projection. If the requested projection is
 * an empty string, automatic selection will be used based on location of input coords.
 * @param {number} x - the x coordinate (longitude if in WGS 84).
 * @param {number} y - the y coordinate (latitude if in WGS 84).
 * @param {string} fromProjection - two letter code for projection of the passed in coords.
 * @param {string} toProjection - two letter code specifying the required output projection - leave empty for automatic selection.
 * @param {array<number>} precisions - array of numbers corresponding to the precisions of the requested grid references.
 * @returns {object} - of the form {p10000: 'gr-hectad', p100: 'gr-6fig'} etc, with a property for each of the requested grid reference precisions.
 */
export function getGrFromCoords (x, y, fromProjection, toProjection, precisions) {

  // Set the output projection automatically if not aleady set
  if (!toProjection) {
    if (fromProjection === 'wg') {
      toProjection = pntToArea(x, y)
    } else {
      const lonlat = proj4(projections[fromProjection].proj4, projections['wg'].proj4, [x, y])
      toProjection = pntToArea(lonlat[0], lonlat[1])
    }
  }

  if (!toProjection) {
    const grs = {}
    precisions.forEach(p => {
      grs[`p${p}`] = null
    })
    return grs
  }
  
  // Convert input coordinates if the input projection does not match requested output projection
  if (fromProjection !== toProjection)  {
    const outCoords = proj4(projections[fromProjection].proj4, projections[toProjection].proj4, [x, y])
    x = outCoords[0]
    y = outCoords[1]
  }

  let km100
  for (let i = 0; i < a100km.length; i++) {
    if (a100km[i].proj === toProjection &&
      x >= a100km[i].x * 100000 &&
      x < (a100km[i].x + 1) * 100000 &&
      y >= a100km[i].y * 100000 &&
      y < (a100km[i].y + 1) * 100000) {

      km100 = a100km[i]
      break
    }
  }

  if(!km100) {
    // The output coordinates do not fall within the range of 100 km grid squares defined for the output projection.
    // Return an empty array.
    return {
      p100000: null,
      p10000: null,
      p5000: null,
      p2000: null,
      p1000: null,
      p100: null,
      p10: null,
      p1: null
    }
  }

  const grs = {}
  precisions.forEach(p => {
    let gr = km100.GridRef
    if (p < 100000){

      let divisor
      if (p === 5000 || p === 2000) {
        divisor = 10000
      } else {
        divisor = p
      }

      const pad = {
        10000: 1,
        1000: 2,
        100: 3,
        10: 4,
        1: 5
      }

      const dx = Math.floor((x - km100.x * 100000) / divisor)
      const dy = Math.floor((y - km100.y * 100000) / divisor)
      const sx = String(dx).padStart(pad[divisor], '0')
      const sy = String(dy).padStart(pad[divisor], '0')

      gr = `${gr}${sx}${sy}`

      if (p === 5000 || p === 2000) {
        let rx = (x - km100.x * 100000) % divisor
        let ry = (y - km100.y * 100000) % divisor
        if (p === 5000) {

          for (const suffix in qOffsets) {
            if (rx >= qOffsets[suffix].x &&
              rx < qOffsets[suffix].x + 5000 && 
              ry >= qOffsets[suffix].y &&
              ry < qOffsets[suffix].y + 5000) {
              gr = `${gr}${suffix.toUpperCase()}`
              break
            }
          }
        } else {
          for (const suffix in tOffsets) {
            if (rx >= tOffsets[suffix].x &&
              rx < tOffsets[suffix].x + 2000 && 
              ry >= tOffsets[suffix].y &&
              ry < tOffsets[suffix].y + 2000) {
              gr = `${gr}${suffix.toUpperCase()}`
              break
            }
          }
        }
      }
    }
    grs[`p${p}`] = gr
  })
  return grs
}