// Utility script to take a geojson file and reduce it's size by removing the decimal
// portion of all coordinates. This is useful for CRS where the map units are metres.
// It can considerably reduce the size of a geojson file. It also removes any
// attribute properties. Use like this:
// node reduce-geojson.js <input-file.geojson> <output-file.geojson>

const fs = require('fs')

if (process.argv.length !== 4) {
    console.error("You must specify two arguments - and input file and an outputfile.")
    process.exit(1)
}

function truncateCoords(arr) {
  // Iterate over the array
  return arr.map(function(e) {
    // If the element is an array call the function recursively
    // otherwise remove decimal part
    return Array.isArray(e) ? truncateCoords(e) : Math.floor(e) 
  })
}

if (fs.existsSync(process.argv[2])) {
  let input = fs.readFileSync(process.argv[2])
  let json = JSON.parse(input)
  newFeatures = json.features.map(function(f){
    // Does not output any feature properties
    const fNew =  {
      type: f.type,
      geometry: {
        type: f.geometry.type,
        coordinates: truncateCoords(f.geometry.coordinates)
      }
    }
    return fNew
  })
  json.features = newFeatures
  fs.writeFileSync(process.argv[3], JSON.stringify(json))
}

