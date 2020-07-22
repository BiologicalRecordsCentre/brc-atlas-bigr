import { getCentroid } from './getCentroid'
const fs = require('fs')

describe('Check invalid GRs correctly dealt with', function () {
  test('getCentroid throws correct error for invalid GR XX', () => {
    let msg = ''
    try {getCentroid('XX', 'gb')}
    catch(err) {msg = err}
    finally {expect(msg).toBe('The value \'XX\' is not recognised as a valid grid reference.')}
  })
  test('getCentroid throws correct error for invalid GR 3456', () => {
    let msg = ''
    try {getCentroid('3456', 'gb')}
    catch(err) {msg = err}
    finally {expect(msg).toBe('The value \'3456\' is not recognised as a valid grid reference.')}
  })
  test('getCentroid throws correct error for invalid GR SD354', () => {
    let msg = ''
    try {getCentroid('SD354', 'gb')}
    catch(err) {msg = err}
    finally {expect(msg).toBe('The value \'SD354\' is not recognised as a valid grid reference.')}
  })
})

describe('Check that correct projection string is returned', function () {
  test('getCentroid returns "gb" projection for "SO" regardless of output coord projection', () => {
    expect(getCentroid('SO', 'gb').proj).toBe('gb')
    expect(getCentroid('SO', 'ir').proj).toBe('gb')
    expect(getCentroid('SO', 'ci').proj).toBe('gb')
  })

  test('getCentroid returns "ir" projection for "X" regardless of output coord projection', () => {
    expect(getCentroid('X', 'gb').proj).toBe('ir')
    expect(getCentroid('X', 'ir').proj).toBe('ir')
    expect(getCentroid('X', 'ci').proj).toBe('ir')
  })

  test('getCentroid returns "ci" projection for "WA" regardless of output coord projection', () => {
    expect(getCentroid('WA', 'gb').proj).toBe('ci')
    expect(getCentroid('WA', 'ir').proj).toBe('ci')
    expect(getCentroid('WA', 'ci').proj).toBe('ci')
  })
})

function testCentroidsFromCsv(file, code) {
  describe(`Check returned centroid coords for ${code.toUpperCase()} projection`, function () {

    fs.readFileSync(file).toString().split('\n').forEach((line, i) => {
      
      const sLine = line.toString().replace(/['"]+/g, '').split(',')
      const gr = sLine[0]
      const xExp = Number(sLine[1])
      const yExp = Number(sLine[2])

      if (i && sLine[0]) { // Ignore header row and any blank (trailing) rows

        const centroid =  getCentroid(gr, code).centroid
        const xObs = centroid[0]
        const yObs = centroid[1]
        const xDiff = Math.abs(xObs - xExp)
        const yDiff = Math.abs(yObs - yExp)

        let permittedDiff
        if (gr.length < 3) {
          if (code === 'wg'){
            permittedDiff = 0.0002
          } else {
            permittedDiff = 10
          }
        } else {
           if (code === 'wg'){
            permittedDiff = 0.00002
          } else {
            permittedDiff = 1
          }
        }

        test(`getCentroid returns correct ${code.toUpperCase()} coords for grid ref: ${gr}`, () => {
          expect(xDiff).toBeLessThanOrEqual(permittedDiff)
          expect(yDiff).toBeLessThanOrEqual(permittedDiff)
        })
      }                                            
    })
  })
}

// CSVs generated with QGIS
// testCentroidsFromCsv('test-data/test-grs-27700.csv', 'gb')
// testCentroidsFromCsv('test-data/test-grs-29903.csv', 'ir')
// testCentroidsFromCsv('test-data/test-grs-32630.csv', 'ci')
// testCentroidsFromCsv('test-data/test-grs-4326.csv', 'wg')
testCentroidsFromCsv('test-data/test-tetrads-27700.csv', 'gb')

