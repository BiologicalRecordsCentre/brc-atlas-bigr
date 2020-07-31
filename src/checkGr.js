/** @module src/checkGr */
import km100s from './km100.js'

function invalidGridRef(gr) {
  throw `The value '${gr}' is not recognised as a valid grid reference.` 
}

/**
 * Given a grid reference (British National Grid, Irish Grid or UTM zone 30N shorthand),
 * check that ths is a valid GR. If it is, return an object which includes the 
 * GR precision in metres, the prefix and the two-letter projection code.
 * If an invalid grid reference is supplied throws an error.
 * @param {string} gr - the grid reference.
 * @returns {object} Object of the form {precision: n, prefix: 'prefix', projection: 'code'}.
 */
export function checkGr (gr) {

  const r100km = RegExp('^[a-zA-Z]{1,2}$')
  const rHectad = RegExp('^[a-zA-Z]{1,2}[0-9]{2}$')
  const rQuandrant = RegExp('^[a-zA-Z]{1,2}[0-9]{2}[SsNn][WwEe]$')
  const rTetrad = RegExp('^[a-zA-Z]{1,2}[0-9]{2}[a-np-zA-NP-Z]$')
  const rMonad = RegExp('^[a-zA-Z]{1,2}[0-9]{4}$')
  const r6fig = RegExp('^[a-zA-Z]{1,2}[0-9]{6}$')
  const r8fig = RegExp('^[a-zA-Z]{1,2}[0-9]{8}$')
  const r10fig = RegExp('^[a-zA-Z]{1,2}[0-9]{10}$')

  const match = gr.match(/^[A-Za-z]+/)
  if (!match) invalidGridRef(gr) 

  const prefix = match[0].toUpperCase()
  const km100 = km100s[prefix]
  
  if (!km100) invalidGridRef(gr) 

  const ret = {precision: null, prefix: prefix, projection: km100.proj}

  if (r100km.test(gr)) {

    // The GR is a 100 km square reference
    ret.precision = 100000

  } else if (rHectad.test(gr)) {

    // The GR is a hectad
    ret.precision = 10000

  } else if (rQuandrant.test(gr)) {

    // The GR is a quandrant
    ret.precision = 5000

  } else if (rTetrad.test(gr)) {
    
     // The GR is a tetrad
     ret.precision = 2000

  } else if (rMonad.test(gr)) {

    // The GR is a monad
    ret.precision = 1000
  
  } else if (r6fig.test(gr)) {

    // The GR is a 6 figure GR
    ret.precision = 100
  
  } else if (r8fig.test(gr)) {

    // The GR is a 8 figure GR
    ret.precision = 10
  
  } else if (r10fig.test(gr)) {

    // The GR is a 10 figure GR
    ret.precision = 1
  
  } else {
    invalidGridRef(gr) 
  }

  return ret
}
