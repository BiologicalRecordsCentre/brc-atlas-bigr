// Utility script to take a geojson file and reduce it's size by rounding decimal
// portion of all coordinates to a given number of decimal places and split each
// feature into a separate geojson file. 
//
// To remove the decimal portion completely,  specify the number of decimal places 
// as zero. This is useful for CRS where the map units are metres.
//
// It can considerably reduce the size of a geojson file. It also removes any
// attribute properties.
//
// The output files are placed in a folder which you specify. You must also 
// specify the name of an attribute which will be used to name the output file and
// a prefix which will be appended to the attribute value - set to an empty
// string if you don't want to add a prefix
//
// The script also produces and extra output file called mbrs.csv which
// records the minumum bounding rectangles of each of the output geojson files.
//
//Use like this:
// node reduce-split-geojson.js <input-file.geojson> <output-folder> <decimal places> <attribute> <prefix>

//const fs = require('fs')
//import fs from 'fs'
const fse = require('fs-extra')

if (process.argv.length !== 7) {
    console.error("You must specify five arguments - and input file and an output folder, a number of decimal places, an attribute and a prefix.")
    process.exit(1)
}

function round(n) {
  return Math.round(n * Math.pow(10, process.argv[4])) / Math.pow(10, process.argv[4])
}

function roundCoords(arr) {
  // Iterate over the array
  return arr.map(function(e) {
    // If the element is an array call the function recursively
    // otherwise round the numbers
    return Array.isArray(e) ? roundCoords(e) : round(e)
  })
}

function updateMbr(arr, mbr) {
  // Iterate over the array
  arr.map(function(e) {
    // If the element is an array call the function recursively
    // otherwise update the MBR if necessary
    if (!Array.isArray(e[0])) {
      const lat = e[1]
      const lon = e[0]
      mbr.ll.lon = lon < mbr.ll.lon ? lon : mbr.ll.lon
      mbr.ll.lat = lat < mbr.ll.lat ? lat : mbr.ll.lat
      mbr.ur.lon = lon > mbr.ur.lon ? lon : mbr.ur.lon
      mbr.ur.lat = lat > mbr.ur.lat ? lat : mbr.ur.lat
    } else {
      updateMbr(e, mbr) 
    }
  })
}

if (fse.existsSync(process.argv[2])) {
  if (fse.existsSync(process.argv[3])) {

    // Write header for MBR file
    fse.writeFileSync(process.argv[3] + '/mbrs.csv', 'attr, lllat, lllon, urlat, urlon\n')

    // Process the features
    let input = fse.readFileSync(process.argv[2])
    let json = JSON.parse(input)
    const newFeatures = json.features.map(function(f){

      // Make mbr calculation
      const mbr = {
        ll: {
          lat: 90,
          lon: 90
        },
        ur: {
          lat: 0,
          lon: -90
        }
      }
      updateMbr(f.geometry.coordinates, mbr)
      // Write mbr into file`
      fse.appendFileSync(process.argv[3] + '/mbrs.csv', `${process.argv[6] + f.properties[process.argv[5]]},${round(mbr.ll.lat)},${round(mbr.ll.lon)},${round(mbr.ur.lat)},${round(mbr.ur.lon)}\n`)

      // Create output feature - does not output any feature properties
      const fNew =  {
        type: f.type,
        filename: process.argv[6] + f.properties[process.argv[5]] + '.geojson',
        geometry: {
          type: f.geometry.type,
          coordinates: roundCoords(f.geometry.coordinates)
        }
      }
      return fNew
    })

    newFeatures.forEach(function(f) {
      const filename = f.filename
      delete f.filename
      json.features = [f]
      fse.writeFileSync(process.argv[3] + '/' + filename, JSON.stringify(json))
    })
  } else {
    console.log("output folder not found")
  }
} else {
  console.log("input file not found")
}

