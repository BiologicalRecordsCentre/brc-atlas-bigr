import { getCentroid } from './getCentroid'
const fs = require('fs')

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
testCentroidsFromCsv('test-data/test-grs-27700.csv', 'gb')
testCentroidsFromCsv('test-data/test-grs-29903.csv', 'ir')
testCentroidsFromCsv('test-data/test-grs-32630.csv', 'ci')
testCentroidsFromCsv('test-data/test-grs-4326.csv', 'wg')
testCentroidsFromCsv('test-data/test-tetrads-27700.csv', 'gb')

