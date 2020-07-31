/** @module src/getLowerResGrs */
import { checkGr } from './checkGr.js'
import { getCentroid } from './getCentroid.js'
import { getGrFromCoords } from './getGrFromCoords.js'

/**
 * Given a grid reference (British National Grid, Irish Grid, UTM zone 30N shorthand),
 * return an object with a corresponsing GR for each precision. For all precisions higher
 * than the precision of the passed in GR, the return GR is set to null. In the special
 * returned Quadrant (5 km) grid references are in an array to allow for the case where
 * the input grid reference is a tetrad and overlaps more than one quadrant.
 * @param {string} gr - Grid reference.
 * @returns {object} - of the form {p100000: 'gr-100km', hectad: 'gr-hectad', quadrant: ['gr_quad1', ...], tetrad: 'gr-tetrad', ...}, with a property for each precisions.
 */
export function getLowerResGrs (gr) {

  const grType = checkGr(gr)

  const ret = {
    p100000: grType.prefix, 
    p10000: null, 
    p5000: [], 
    p2000: null, 
    p1000: null, 
    p100: null, 
    p10: null, 
    p1: null
  }

  // Set the passed in GR in the return value
  ret[`p${grType.precision}`] = gr

  // Get centroid 
  const c = getCentroid(gr, grType.projection).centroid
  const precisions = [10000, 5000, 2000, 1000, 100, 10, 1].filter(p => p > grType.precision)
  const grs = getGrFromCoords(c[0], c[1], grType.projection, grType.projection, precisions)

  precisions.forEach(p => {
    if (p === 5000) {
      if (grType.precision === 2000) {
        const hectad = gr.substring(0,gr.length-2)
        if ('ABCFGHKLM'.indexOf(gr.substr(-1)) > -1) {
          ret.p5000.push(`${hectad}SW`)
        }
        if ('KLMQRSVWX'.indexOf(gr.substr(-1)) > -1) {
          ret.p5000.push(`${hectad}SE`)
        }
        if ('CDEHIJMNP'.indexOf(gr.substr(-1)) > -1) {
          ret.p5000.push(`${hectad}NW`)
        }
        if ('MNPSTUXYZ'.indexOf(gr.substr(-1)) > -1) {
          ret.p5000.push(`${hectad}NE`)
        }
      } else {
        ret.p5000.push(grs.p5000)
      }
    } else {
      ret[`p${p}`] = grs[`p${p}`]
    }
  })
  return ret
}