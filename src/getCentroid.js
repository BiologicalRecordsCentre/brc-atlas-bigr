/** @module src/getCentroid */
import proj4 from 'proj4'
import km100s from './km100'
import projections from './projections'
import qOffsets from './quadrants'
import tOffsets from './tetrads'

function invalidGridRef(gr) {
  throw `The value '${gr}' is not recognised as a valid grid reference.` 
}

/**
 * Given a grid reference (British National Grid, Irish Grid or UTM zone 30N shorthand),
 * and a two-letter code defining the requested output projection, this function
 * returns the centroid of the grid reference. If an invalid grid reference is supplied
 * and error will be thrown indicating the problem.
 * @param {string} gr - the grid reference
 * @param {string} toProjection - two letter code specifying the required output CRS.
 * @returns {object} - of the form {centroid: [x, y], proj: 'code'}; x and y are 
 * coordinates in CRS specified by toProjection. The proj code indicates the source projection.
 * @todo Expand to deal with grid references of all precisions 
 * (currently - 01/07/2020 only deals with hectads and 100 km grs).
 */
export function getCentroid (gr, toProjection) {

  let x, y, outCoords, suffix
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

  if (r100km.test(gr)) {

    // The GR is a 100 km square reference
    x = km100.x * 100000 + 50000
    y = km100.y * 100000 + 50000

  } else if (rHectad.test(gr)) {

    // The GR is a hectad
    x = km100.x * 100000 + Number(gr.substr(prefix.length,1)) * 10000 + 5000
    y = km100.y * 100000 + Number(gr.substr(prefix.length+1,1)) * 10000 + 5000

  } else if (rQuandrant.test(gr)) {

    // The GR is a quandrant
    suffix = gr.substr(prefix.length+2,2).toLowerCase()
    x = km100.x * 100000 + Number(gr.substr(prefix.length,1)) * 10000 + qOffsets[suffix].x + 2500
    y = km100.y * 100000 + Number(gr.substr(prefix.length+1,1)) * 10000 + qOffsets[suffix].y + 2500

  } else if (rTetrad.test(gr)) {
    
     // The GR is a tetrad
     suffix = gr.substr(prefix.length+2,1).toLowerCase()
     x = km100.x * 100000 + Number(gr.substr(prefix.length,1)) * 10000 + tOffsets[suffix].x + 1000
     y = km100.y * 100000 + Number(gr.substr(prefix.length+1,1)) * 10000 + tOffsets[suffix].y + 1000

  } else if (rMonad.test(gr)) {

    // The GR is a monad
    x = km100.x * 100000 + Number(gr.substr(prefix.length,2)) * 1000 + 500
    y = km100.y * 100000 + Number(gr.substr(prefix.length+2,2)) * 1000 + 500
  
  } else if (r6fig.test(gr)) {

    // The GR is a 6 figure GR
    x = km100.x * 100000 + Number(gr.substr(prefix.length,3)) * 100 + 50
    y = km100.y * 100000 + Number(gr.substr(prefix.length+3,3)) * 100 + 50
  
  } else if (r8fig.test(gr)) {

    // The GR is a 8 figure GR
    x = km100.x * 100000 + Number(gr.substr(prefix.length,4)) * 10 + 5
    y = km100.y * 100000 + Number(gr.substr(prefix.length+4,4)) * 10 + 5
  
  } else if (r10fig.test(gr)) {

    // The GR is a 10 figure GR
    x = km100.x * 100000 + Number(gr.substr(prefix.length,5)) + 0.5
    y = km100.y * 100000 + Number(gr.substr(prefix.length+5,5)) + 0.5
  
  } else {
    invalidGridRef(gr) 
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
