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
//Use like this:
// node reduce-split-geojson.js <input-file.geojson> <output-folder> <decimal places> <attribute> <prefix>

//const fs = require('fs')
//import fs from 'fs'
const fse = require('fs-extra')

if (process.argv.length !== 7) {
    console.error("You must specify five arguments - and input file and an output folder, a number of decimal places, an attribute and a prefix.")
    process.exit(1)
}

function roundCoords(arr) {
  // Iterate over the array
  return arr.map(function(e) {
    // If the element is an array call the function recursively
    // otherwise round the numbers
    return Array.isArray(e) ? roundCoords(e) : Math.round(e * Math.pow(10, process.argv[4])) / Math.pow(10, process.argv[4])
  })
}

if (fse.existsSync(process.argv[2])) {
  if (fse.existsSync(process.argv[3])) {
    let input = fse.readFileSync(process.argv[2])
    let json = JSON.parse(input)
    const newFeatures = json.features.map(function(f){
      // Does not output any feature properties
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

