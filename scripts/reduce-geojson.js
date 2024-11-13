// Utility script to take a geojson file and reduce it's size by rounding decimal
// portion of all coordinates to a given number of decimal places. To remove the
// decimal portion, specify the number of decimal places as zero. 
// This is useful for CRS where the map units are metres.
// It can considerably reduce the size of a geojson file. It also removes any
// attribute properties. Use like this:
// node reduce-geojson.js <input-file.geojson> <output-file.geojson> <decimal places>

//const fs = require('fs')
import fse from 'fs-extra'
//const fse = require('fs-extra')

if (process.argv.length !== 5) {
    console.error("You must specify three arguments - and input file and an outputfile and number of decimal places.")
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
  let input = fse.readFileSync(process.argv[2])
  let json = JSON.parse(input)
  let newFeatures = json.features.map(function(f){
    // Does not output any feature properties
    const fNew =  {
      type: f.type,
      geometry: {
        type: f.geometry.type,
        coordinates: roundCoords(f.geometry.coordinates)
      }
    }
    return fNew
  })
  json.features = newFeatures
  fse.writeFileSync(process.argv[3], JSON.stringify(json))
} else {
  console.log("input file not found")
}

