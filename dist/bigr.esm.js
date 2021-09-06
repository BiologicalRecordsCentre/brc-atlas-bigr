import proj4 from 'proj4';
import pkg from 'point-in-polygon';

/** @module src/km100 */

/** @constant
  * @description This the array from which the default object is derived. If you
  * need to work with an array of objects where the 100 km grid reference is a property
  * of the object alongside x, y, and proj, you can use this.
  * @type {array}
*/
const a100km = [
  {
    "GridRef": "SV",
    "x": 0,
    "y": 0,
    "proj": "gb"
  },
  {
    "GridRef": "NL",
    "x": 0,
    "y": 7,
    "proj": "gb"
  },
  {
    "GridRef": "NF",
    "x": 0,
    "y": 8,
    "proj": "gb"
  },
  {
    "GridRef": "NA",
    "x": 0,
    "y": 9,
    "proj": "gb"
  },
  {
    "GridRef": "SW",
    "x": 1,
    "y": 0,
    "proj": "gb"
  },
  {
    "GridRef": "SR",
    "x": 1,
    "y": 1,
    "proj": "gb"
  },
  {
    "GridRef": "SM",
    "x": 1,
    "y": 2,
    "proj": "gb"
  },
  {
    "GridRef": "NW",
    "x": 1,
    "y": 5,
    "proj": "gb"
  },
  {
    "GridRef": "NR",
    "x": 1,
    "y": 6,
    "proj": "gb"
  },
  {
    "GridRef": "NM",
    "x": 1,
    "y": 7,
    "proj": "gb"
  },
  {
    "GridRef": "NG",
    "x": 1,
    "y": 8,
    "proj": "gb"
  },
  {
    "GridRef": "NB",
    "x": 1,
    "y": 9,
    "proj": "gb"
  },
  {
    "GridRef": "HW",
    "x": 1,
    "y": 10,
    "proj": "gb"
  },
  {
    "GridRef": "SX",
    "x": 2,
    "y": 0,
    "proj": "gb"
  },
  {
    "GridRef": "SS",
    "x": 2,
    "y": 1,
    "proj": "gb"
  },
  {
    "GridRef": "SN",
    "x": 2,
    "y": 2,
    "proj": "gb"
  },
  {
    "GridRef": "SH",
    "x": 2,
    "y": 3,
    "proj": "gb"
  },
  {
    "GridRef": "SC",
    "x": 2,
    "y": 4,
    "proj": "gb"
  },
  {
    "GridRef": "NX",
    "x": 2,
    "y": 5,
    "proj": "gb"
  },
  {
    "GridRef": "NS",
    "x": 2,
    "y": 6,
    "proj": "gb"
  },
  {
    "GridRef": "NN",
    "x": 2,
    "y": 7,
    "proj": "gb"
  },
  {
    "GridRef": "NH",
    "x": 2,
    "y": 8,
    "proj": "gb"
  },
  {
    "GridRef": "NC",
    "x": 2,
    "y": 9,
    "proj": "gb"
  },
  {
    "GridRef": "HX",
    "x": 2,
    "y": 10,
    "proj": "gb"
  },
  {
    "GridRef": "SY",
    "x": 3,
    "y": 0,
    "proj": "gb"
  },
  {
    "GridRef": "ST",
    "x": 3,
    "y": 1,
    "proj": "gb"
  },
  {
    "GridRef": "SO",
    "x": 3,
    "y": 2,
    "proj": "gb"
  },
  {
    "GridRef": "SJ",
    "x": 3,
    "y": 3,
    "proj": "gb"
  },
  {
    "GridRef": "SD",
    "x": 3,
    "y": 4,
    "proj": "gb"
  },
  {
    "GridRef": "NY",
    "x": 3,
    "y": 5,
    "proj": "gb"
  },
  {
    "GridRef": "NT",
    "x": 3,
    "y": 6,
    "proj": "gb"
  },
  {
    "GridRef": "NO",
    "x": 3,
    "y": 7,
    "proj": "gb"
  },
  {
    "GridRef": "NJ",
    "x": 3,
    "y": 8,
    "proj": "gb"
  },
  {
    "GridRef": "ND",
    "x": 3,
    "y": 9,
    "proj": "gb"
  },
  {
    "GridRef": "HY",
    "x": 3,
    "y": 10,
    "proj": "gb"
  },
  {
    "GridRef": "HT",
    "x": 3,
    "y": 11,
    "proj": "gb"
  },
  {
    "GridRef": "SZ",
    "x": 4,
    "y": 0,
    "proj": "gb"
  },
  {
    "GridRef": "SU",
    "x": 4,
    "y": 1,
    "proj": "gb"
  },
  {
    "GridRef": "SP",
    "x": 4,
    "y": 2,
    "proj": "gb"
  },
  {
    "GridRef": "SK",
    "x": 4,
    "y": 3,
    "proj": "gb"
  },
  {
    "GridRef": "SE",
    "x": 4,
    "y": 4,
    "proj": "gb"
  },
  {
    "GridRef": "NZ",
    "x": 4,
    "y": 5,
    "proj": "gb"
  },
  {
    "GridRef": "NU",
    "x": 4,
    "y": 6,
    "proj": "gb"
  },
  {
    "GridRef": "NK",
    "x": 4,
    "y": 8,
    "proj": "gb"
  },
  {
    "GridRef": "HZ",
    "x": 4,
    "y": 10,
    "proj": "gb"
  },
  {
    "GridRef": "HU",
    "x": 4,
    "y": 11,
    "proj": "gb"
  },
  {
    "GridRef": "HP",
    "x": 4,
    "y": 12,
    "proj": "gb"
  },
  {
    "GridRef": "TV",
    "x": 5,
    "y": 0,
    "proj": "gb"
  },
  {
    "GridRef": "TQ",
    "x": 5,
    "y": 1,
    "proj": "gb"
  },
  {
    "GridRef": "TL",
    "x": 5,
    "y": 2,
    "proj": "gb"
  },
  {
    "GridRef": "TF",
    "x": 5,
    "y": 3,
    "proj": "gb"
  },
  {
    "GridRef": "TA",
    "x": 5,
    "y": 4,
    "proj": "gb"
  },
  {
    "GridRef": "OV",
    "x": 5,
    "y": 5,
    "proj": "gb"
  },
  {
    "GridRef": "TR",
    "x": 6,
    "y": 1,
    "proj": "gb"
  },
  {
    "GridRef": "TM",
    "x": 6,
    "y": 2,
    "proj": "gb"
  },
  {
    "GridRef": "TG",
    "x": 6,
    "y": 3,
    "proj": "gb"
  },
  {
    "GridRef": "V",
    "x": 0,
    "y": 0,
    "proj": "ir"
  },
  {
    "GridRef": "Q",
    "x": 0,
    "y": 1,
    "proj": "ir"
  },
  {
    "GridRef": "L",
    "x": 0,
    "y": 2,
    "proj": "ir"
  },
  {
    "GridRef": "F",
    "x": 0,
    "y": 3,
    "proj": "ir"
  },
  {
    "GridRef": "A",
    "x": 0,
    "y": 4,
    "proj": "ir"
  },
  {
    "GridRef": "W",
    "x": 1,
    "y": 0,
    "proj": "ir"
  },
  {
    "GridRef": "R",
    "x": 1,
    "y": 1,
    "proj": "ir"
  },
  {
    "GridRef": "M",
    "x": 1,
    "y": 2,
    "proj": "ir"
  },
  {
    "GridRef": "G",
    "x": 1,
    "y": 3,
    "proj": "ir"
  },
  {
    "GridRef": "B",
    "x": 1,
    "y": 4,
    "proj": "ir"
  },
  {
    "GridRef": "X",
    "x": 2,
    "y": 0,
    "proj": "ir"
  },
  {
    "GridRef": "S",
    "x": 2,
    "y": 1,
    "proj": "ir"
  },
  {
    "GridRef": "N",
    "x": 2,
    "y": 2,
    "proj": "ir"
  },
  {
    "GridRef": "H",
    "x": 2,
    "y": 3,
    "proj": "ir"
  },
  {
    "GridRef": "C",
    "x": 2,
    "y": 4,
    "proj": "ir"
  },
  {
    "GridRef": "Y",
    "x": 3,
    "y": 0,
    "proj": "ir"
  },
  {
    "GridRef": "T",
    "x": 3,
    "y": 1,
    "proj": "ir"
  },
  {
    "GridRef": "O",
    "x": 3,
    "y": 2,
    "proj": "ir"
  },
  {
    "GridRef": "J",
    "x": 3,
    "y": 3,
    "proj": "ir"
  },
  {
    "GridRef": "D",
    "x": 3,
    "y": 4,
    "proj": "ir"
  },
  {
    "GridRef": "Z",
    "x": 4,
    "y": 0,
    "proj": "ir"
  },
  {
    "GridRef": "U",
    "x": 4,
    "y": 1,
    "proj": "ir"
  },
  {
    "GridRef": "P",
    "x": 4,
    "y": 2,
    "proj": "ir"
  },
  {
    "GridRef": "K",
    "x": 4,
    "y": 3,
    "proj": "ir"
  },
  {
    "GridRef": "E",
    "x": 4,
    "y": 4,
    "proj": "ir"
  },
  {
    "GridRef": "WV",
    "x": 5,
    "y": 54,
    "proj": "ci"
  },
  {
    "GridRef": "WA",
    "x": 5,
    "y": 55,
    "proj": "ci"
  }
];

/** @constant
  * @description The default export from this module is an object with a property
  * for every 100 km square reference for Britain (Brtish National Grid),
  * Ireland (Irish National Grid) and the Channel Islands (abbreviated UTM 30N).
  * Each grid reference references an object that has properties x, y and proj.
  * The x and y coordinates represent the centroid of the 100 km square in the
  * coordinate reference system corresponding to the aforementioned areas, respectively
  * epsg:27700, epsg:29903 and epsg:32630. Another property, proj, indicates the region/CRS
  * with two letter codes, respectively gb, ir and ci.
  * <p>An example of the object referenced through the property 'SO' is shown below:</p>
  * <pre>
  * {
  *   "x": 3,
  *   "y": 2,
  *   "proj": "gb"
  * }
  * </pre>
  * @type {object}
*/
var km100s = a100km.reduce(function(acc, km100) {
    acc[km100.GridRef] = {
      x: km100.x,
      y: km100.y,
      proj: km100.proj
    };
    return acc
  }, {});

/** @module src/checkGr */

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
function checkGr (gr) {

  const r100km = RegExp('^[a-zA-Z]{1,2}$');
  const rHectad = RegExp('^[a-zA-Z]{1,2}[0-9]{2}$');
  const rQuandrant = RegExp('^[a-zA-Z]{1,2}[0-9]{2}[SsNn][WwEe]$');
  const rTetrad = RegExp('^[a-zA-Z]{1,2}[0-9]{2}[a-np-zA-NP-Z]$');
  const rMonad = RegExp('^[a-zA-Z]{1,2}[0-9]{4}$');
  const r6fig = RegExp('^[a-zA-Z]{1,2}[0-9]{6}$');
  const r8fig = RegExp('^[a-zA-Z]{1,2}[0-9]{8}$');
  const r10fig = RegExp('^[a-zA-Z]{1,2}[0-9]{10}$');

  const match = gr.match(/^[A-Za-z]+/);
  if (!match) invalidGridRef(gr); 

  const prefix = match[0].toUpperCase();
  const km100 = km100s[prefix];
  
  if (!km100) invalidGridRef(gr); 

  const ret = {precision: null, prefix: prefix, projection: km100.proj};

  if (r100km.test(gr)) {

    // The GR is a 100 km square reference
    ret.precision = 100000;

  } else if (rHectad.test(gr)) {

    // The GR is a hectad
    ret.precision = 10000;

  } else if (rQuandrant.test(gr)) {

    // The GR is a quandrant
    ret.precision = 5000;

  } else if (rTetrad.test(gr)) {
    
     // The GR is a tetrad
     ret.precision = 2000;

  } else if (rMonad.test(gr)) {

    // The GR is a monad
    ret.precision = 1000;
  
  } else if (r6fig.test(gr)) {

    // The GR is a 6 figure GR
    ret.precision = 100;
  
  } else if (r8fig.test(gr)) {

    // The GR is a 8 figure GR
    ret.precision = 10;
  
  } else if (r10fig.test(gr)) {

    // The GR is a 10 figure GR
    ret.precision = 1;
  
  } else {
    invalidGridRef(gr); 
  }

  return ret
}

/** @module src/projections */

/** @constant
  * @description This object describes the coordinate reference systems used in this project corresponding
  * to the British National Grid, Irish Grid, UTM zone 30N (used for the Channel Islands)  and WGS 84. The object contains
  * four properties, each named with the two letter code used throughout this package to represent one of the
  * three systems: gb, ir, ci and wg. Each of these properties provides access to an object defining the name,
  * epsg code and proj4 string for the CRS.
  * @type {array}
*/

var projections = {
  gb: {
    name: 'OSGB 1936 / British National Grid',
    epsg: '27700',
    proj4: '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs',
  },
  ir: {
    name: 'TM75 / Irish Grid',
    epsg: '29903',
    proj4: '+proj=tmerc +lat_0=53.5 +lon_0=-8 +k=1.000035 +x_0=200000 +y_0=250000 +ellps=mod_airy +towgs84=482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15 +units=m +no_defs',
  },
  ci: {
    name: 'WGS 84 / UTM zone 30N',
    epsg: '32630',
    proj4: '+proj=utm +zone=30 +datum=WGS84 +units=m +no_defs',
  },
  wg: {
    name: 'WGS 84',
    epsg: '4326',
    proj4: '+proj=longlat +datum=WGS84 +no_defs',
  }
};

/** @module src/quadrants */

/** @constant
  * @description This object specifies the x, y offsets associated with suffixes for quandrant grid refs.
  * @type {Object}
*/

var qOffsets = {
  sw: {
    x: 0,
    y: 0
  },
  se: {
    x: 5000,
    y: 0
  },
  nw: {
    x: 0,
    y: 5000
  },
  ne: {
    x: 5000,
    y: 5000
  }
};

/** @module src/tetrads */

/** @constant
  * @description This object specifies the x, y offsets associated with suffixes for tetrad grid refs.
  * @type {Object}
*/

var tOffsets = {
  a: {
    x: 0,
    y: 0
  },
  b: {
    x: 0,
    y: 2000
  },
  c: {
    x: 0,
    y: 4000
  },
  d: {
    x: 0,
    y: 6000
  },
  e: {
    x: 0,
    y: 8000
  },
  f: {
    x: 2000,
    y: 0
  },
  g: {
    x: 2000,
    y: 2000
  },
  h: {
    x: 2000,
    y: 4000
  },
  i: {
    x: 2000,
    y: 6000
  },
  j: {
    x: 2000,
    y: 8000
  },
  k: {
    x: 4000,
    y: 0
  },
  l: {
    x: 4000,
    y: 2000
  },
  m: {
    x: 4000,
    y: 4000
  },
  n: {
    x: 4000,
    y: 6000
  },
  p: {
    x: 4000,
    y: 8000
  },
  q: {
    x: 6000,
    y: 0
  },
  r: {
    x: 6000,
    y: 2000
  },
  s: {
    x: 6000,
    y: 4000
  },
  t: {
    x: 6000,
    y: 6000
  },
  u: {
    x: 6000,
    y: 8000
  },
  v: {
    x: 8000,
    y: 0
  },
  w: {
    x: 8000,
    y: 2000
  },
  x: {
    x: 8000,
    y: 4000
  },
  y: {
    x: 8000,
    y: 6000
  },
  z: {
    x: 8000,
    y: 8000
  }
};

/** @module src/getCentroid */

/**
 * Given a grid reference (British National Grid, Irish Grid or UTM zone 30N shorthand),
 * and a two-letter code defining the requested output projection, this function
 * returns the centroid of the grid reference.
 * @param {string} gr - the grid reference
 * @param {string} toProjection - two letter code specifying the required output CRS.
 * @returns {object} - of the form {centroid: [x, y], proj: 'code'}; x and y are 
 * coordinates in CRS specified by toProjection. The proj code indicates the source projection.
 */
function getCentroid (gr, toProjection) {

  let x, y, outCoords, suffix;
  const grType = checkGr(gr);
  const prefix = grType.prefix;
  const km100 = km100s[prefix];

  switch(grType.precision) {
    case 100000:
      x = km100.x * 100000 + 50000;
      y = km100.y * 100000 + 50000;
      break;
    case 10000:
      x = km100.x * 100000 + Number(gr.substr(prefix.length,1)) * 10000 + 5000;
      y = km100.y * 100000 + Number(gr.substr(prefix.length+1,1)) * 10000 + 5000;
      break;
    case 5000:
      suffix = gr.substr(prefix.length+2,2).toLowerCase();
      x = km100.x * 100000 + Number(gr.substr(prefix.length,1)) * 10000 + qOffsets[suffix].x + 2500;
      y = km100.y * 100000 + Number(gr.substr(prefix.length+1,1)) * 10000 + qOffsets[suffix].y + 2500;
      break
    case 2000:
      suffix = gr.substr(prefix.length+2,1).toLowerCase();
      x = km100.x * 100000 + Number(gr.substr(prefix.length,1)) * 10000 + tOffsets[suffix].x + 1000;
      y = km100.y * 100000 + Number(gr.substr(prefix.length+1,1)) * 10000 + tOffsets[suffix].y + 1000;
      break
    case 1000:
      x = km100.x * 100000 + Number(gr.substr(prefix.length,2)) * 1000 + 500;
      y = km100.y * 100000 + Number(gr.substr(prefix.length+2,2)) * 1000 + 500;
      break
    case 100:
      x = km100.x * 100000 + Number(gr.substr(prefix.length,3)) * 100 + 50;
      y = km100.y * 100000 + Number(gr.substr(prefix.length+3,3)) * 100 + 50;
      break
    case 10:
      x = km100.x * 100000 + Number(gr.substr(prefix.length,4)) * 10 + 5;
      y = km100.y * 100000 + Number(gr.substr(prefix.length+4,4)) * 10 + 5;
      break
    default:
      x = km100.x * 100000 + Number(gr.substr(prefix.length,5)) + 0.5;
      y = km100.y * 100000 + Number(gr.substr(prefix.length+5,5)) + 0.5;
  }

  // If the required output projection does not match the projection of the input GR
  // then use proj4 to reproject
  if (toProjection !== km100.proj)  {
    outCoords = proj4(projections[km100.proj].proj4, projections[toProjection].proj4, [x, y]);
  } else {
    outCoords = [x, y];
  }
  return {
    centroid: outCoords,
    proj: km100.proj
  }
}

/** @module src/getGjson */

function convertCoords(fromProjection, toProjection, x, y) {

  let outCoords;
  // If the required output projection does not match the projection of the input GR
  // then use proj4 to reproject
  if (toProjection !== fromProjection)  {
    outCoords = proj4(projections[fromProjection].proj4, projections[toProjection].proj4, [x, y]);
  } else {
    outCoords = [x, y];
  }
  return outCoords
}

/**
 * Given a grid reference (British National Grid, Irish Grid or UTM zone 30N shorthand),
 * a two-letter code defining the requested output projection, and a string indicating
 * the shape of the required 'symbol', this function returns a GeoJson pth geometry object.
 * @param {string} gr - the grid reference.
 * @param {string} toProjection - two letter code specifying the required output CRS.
 * @param {string} shape - string specifying the requested output shape type.
 * @param {number} scale - number between 0 and 1 to scale the output object.
 * @returns {object} - a GeoJson path geometry object.
 * @todo Extend to return all symbol types
 */
function getGjson (gr, toProjection, shape, scale) {

  const size = scale ? scale : 1; 
  const grType = checkGr(gr);
  const km100 = km100s[grType.prefix];
  const centroid = getCentroid(gr, km100.proj).centroid;
  const xmin = centroid[0] - grType.precision / 2 * size;
  const xmax = centroid[0] + grType.precision / 2 * size;
  const ymin = centroid[1] - grType.precision / 2 * size;
  const ymax = centroid[1] + grType.precision / 2 * size;
  const xmid = xmin + (xmax-xmin)/2;
  const ymid = ymin + (ymax-ymin)/2;

  let coords;
  let type = "Polygon";
  if (shape === "square") {
    coords = [[
      convertCoords(km100.proj, toProjection, xmin, ymin),
      convertCoords(km100.proj, toProjection, xmax, ymin),
      convertCoords(km100.proj, toProjection, xmax, ymax),
      convertCoords(km100.proj, toProjection, xmin, ymax),
      convertCoords(km100.proj, toProjection, xmin, ymin)
    ]];
  } else if (shape === "triangle-up") {
    coords = [[
      convertCoords(km100.proj, toProjection, xmin, ymin),
      convertCoords(km100.proj, toProjection, xmax, ymin),
      convertCoords(km100.proj, toProjection, xmid, ymax),
      convertCoords(km100.proj, toProjection, xmin, ymin)
    ]];
  } else if (shape === "triangle-down") {
    coords = [[
      convertCoords(km100.proj, toProjection, xmid, ymin),
      convertCoords(km100.proj, toProjection, xmax, ymax),
      convertCoords(km100.proj, toProjection, xmin, ymax),
      convertCoords(km100.proj, toProjection, xmid, ymin)
    ]];
  } else if (shape === "diamond") {
    coords = [[
      convertCoords(km100.proj, toProjection, xmid, ymin),
      convertCoords(km100.proj, toProjection, xmax, ymid),
      convertCoords(km100.proj, toProjection, xmid, ymax),
      convertCoords(km100.proj, toProjection, xmin, ymid),
      convertCoords(km100.proj, toProjection, xmid, ymin)
    ]];
  } else if (shape === "circle") {
    const rad = grType.precision / 2 * size;
    coords = [[]];
    for(let deg  = 0; deg <= 360;  deg += 15){
      const angle = deg * Math.PI / 180;
      const x = rad * Math.cos(angle) + centroid[0];
      const y = rad * Math.sin(angle) + centroid[1];
      coords[0].push(convertCoords(km100.proj, toProjection, x, y));
    }
  } else if (shape === "circlerad") {
    coords = [[
      convertCoords(km100.proj, toProjection, centroid[0], centroid[1]),
      convertCoords(km100.proj, toProjection, xmax, centroid[1])
    ]];
  } else if (shape === "cross") {
    type = "MultiLineString";
    coords = [
      [convertCoords(km100.proj, toProjection, xmin, ymin),
      convertCoords(km100.proj, toProjection, xmax, ymin),
      convertCoords(km100.proj, toProjection, xmax, ymax),
      convertCoords(km100.proj, toProjection, xmin, ymax),
      convertCoords(km100.proj, toProjection, xmin, ymin)],
      [convertCoords(km100.proj, toProjection, xmin, ymin),
      convertCoords(km100.proj, toProjection, xmax, ymax)],
      [convertCoords(km100.proj, toProjection, xmin, ymax),
      convertCoords(km100.proj, toProjection, xmax, ymin)]
    ];
  } else if (shape === "point") {
    type = "Point";
    coords = convertCoords(km100.proj, toProjection, centroid[0], centroid[1]);
  }

  return {
    "type": type,
    "coordinates": coords
  }
}

/** @module src/pntToArea */
const inside = pkg;

const polyGb = [[-5.079346,54.356181],[-5.218856,54.352538],[-5.238015,54.577735],[-5.594707,55.067578],[-5.85957,55.233056],[-6.1989,55.442175],[-6.754907,55.520643],[-6.826016,56.098271],[-8.4242,56.025199],[-8.577402,56.917818],[-8.739734,57.810026],[-8.911963,58.7018],[-7.193942,58.782764],[-7.332053,59.676983],[-5.560279,59.737099],[-3.782533,59.77326],[-3.831945,60.670683],[-2.001839,60.683214],[-2.0019,61.58096],[-0.119146,61.568018],[-0.17173,60.67074],[-0.22103,59.773315],[-0.267328,58.875744],[-2.00173,58.887355],[-2.00168,57.989238],[-0.310874,57.978026],[-0.351892,57.080161],[-2.001633,57.090993],[-2.001588,56.192619],[-0.390579,56.182148],[-0.427115,55.283988],[1.145328,55.253591],[1.076342,54.356271],[1.011037,53.458761],[2.513016,53.411393],[2.420466,52.515203],[2.332666,51.618767],[2.249301,50.722093],[0.834724,50.76511],[0.781771,49.866861],[-0.609132,49.891897],[-2.001337,49.900236],[-3.39354,49.891859],[-4.784439,49.866784],[-6.172738,49.825069],[-7.55716,49.766807],[-7.662447,50.661841],[-6.252021,50.721974],[-6.33545,51.618645],[-5.822792,52.024604],[-5.051366,52.558456],[-5.051366,52.558457],[-4.952011,52.560978],[-5.013966,53.458674],[-5.079346,54.356181]];
const polyIr = [[-10.863443,51.218565],[-10.920638,52.116175],[-10.980909,53.013601],[-11.044479,53.91084],[-11.111595,54.80789],[-11.182531,55.704747],[-9.592679,55.735662],[-8.000759,55.74598],[-6.781597,55.739941],[-6.754907,55.520643],[-6.419264,55.473617],[-6.1989,55.442175],[-5.85957,55.233056],[-5.594707,55.067578],[-5.413363,54.820209],[-5.238015,54.577735],[-5.218856,54.352538],[-5.079346,54.356181],[-5.046624,53.9131],[-5.013966,53.458674],[-5.001631,53.283731],[-5.020559,53.013619],[-5.051336,52.558457],[-5.051366,52.558457],[-5.051366,52.558456],[-5.673366,52.129388],[-5.822792,52.024604],[-6.33545,51.618645],[-6.299809,51.241244],[-6.568641,51.244838],[-8.000721,51.253594],[-9.432801,51.24483],[-10.863443,51.218565]];
const polyCi = [[-1.614831,49.644257],[-1.639721,48.744984],[-3,48.753013],[-3,49.652543],[-3,49.895922],[-2.001337,49.900236],[-1.607534,49.899573],[-1.614831,49.644257]];

/**
 * Given a WGS 84 lon, lat pair, return the two letter code corresponding to the area
 * that the point is in. The three polygons describe the regions covered by the 100 km
 * squares for the British, Irish and Channel Island coordinate systems. These areas are
 * exclusive. Where they overlap, e.g. British and Irish, they have been divided by a line
 * through the Irish see roughly midway between the land masses. For the Channel Islands
 * and Britain, the CI UTM 30 grid is truncated where it overlaps the British grid. The
 * function returns the two-letter code corresponding to the area: gb, ir or ci.
 * It returns null if the point doesn't fall within any of these areas.
 * @param {number} lon - Longitude.
 * @param {number} lat - Latitude.
 * @returns {string} - Two-letter code corresponding to the area, or null.
 */
function pntToArea (lon, lat) {
  if (inside([ lon, lat ], polyGb)) return 'gb'
  if (inside([ lon, lat ], polyIr)) return 'ir'
  if (inside([ lon, lat ], polyCi)) return 'ci'
  return null
}

/** @module src/getGrFromCoords */

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
function getGrFromCoords (x, y, fromProjection, toProjection, precisions) {

  // Set the output projection automatically if not aleady set
  if (!toProjection) {
    if (fromProjection === 'wg') {
      toProjection = pntToArea(x, y);
    } else {
      const lonlat = proj4(projections[fromProjection].proj4, projections['wg'].proj4, [x, y]);
      toProjection = pntToArea(lonlat[0], lonlat[1]);
    }
  }

  if (!toProjection) {
    const grs = {};
    precisions.forEach(p => {
      grs[`p${p}`] = null;
    });
    return grs
  }
  
  // Convert input coordinates if the input projection does not match requested output projection
  if (fromProjection !== toProjection)  {
    const outCoords = proj4(projections[fromProjection].proj4, projections[toProjection].proj4, [x, y]);
    x = outCoords[0];
    y = outCoords[1];
  }

  let km100;
  for (let i = 0; i < a100km.length; i++) {
    if (a100km[i].proj === toProjection &&
      x >= a100km[i].x * 100000 &&
      x < (a100km[i].x + 1) * 100000 &&
      y >= a100km[i].y * 100000 &&
      y < (a100km[i].y + 1) * 100000) {

      km100 = a100km[i];
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

  const grs = {};
  precisions.forEach(p => {
    let gr = km100.GridRef;
    if (p < 100000){

      let divisor;
      if (p === 5000 || p === 2000) {
        divisor = 10000;
      } else {
        divisor = p;
      }

      const pad = {
        10000: 1,
        1000: 2,
        100: 3,
        10: 4,
        1: 5
      };

      const dx = Math.floor((x - km100.x * 100000) / divisor);
      const dy = Math.floor((y - km100.y * 100000) / divisor);
      const sx = String(dx).padStart(pad[divisor], '0');
      const sy = String(dy).padStart(pad[divisor], '0');

      gr = `${gr}${sx}${sy}`;

      if (p === 5000 || p === 2000) {
        let rx = (x - km100.x * 100000) % divisor;
        let ry = (y - km100.y * 100000) % divisor;
        if (p === 5000) {

          for (const suffix in qOffsets) {
            if (rx >= qOffsets[suffix].x &&
              rx < qOffsets[suffix].x + 5000 && 
              ry >= qOffsets[suffix].y &&
              ry < qOffsets[suffix].y + 5000) {
              gr = `${gr}${suffix.toUpperCase()}`;
              break
            }
          }
        } else {
          for (const suffix in tOffsets) {
            if (rx >= tOffsets[suffix].x &&
              rx < tOffsets[suffix].x + 2000 && 
              ry >= tOffsets[suffix].y &&
              ry < tOffsets[suffix].y + 2000) {
              gr = `${gr}${suffix.toUpperCase()}`;
              break
            }
          }
        }
      }
    }
    grs[`p${p}`] = gr;
  });
  return grs
}

/** @module src/getLowerResGrs */

/**
 * Given a grid reference (British National Grid, Irish Grid, UTM zone 30N shorthand),
 * return an object with a corresponsing GR for each precision. For all precisions higher
 * than the precision of the passed in GR, the return GR is set to null. In the special
 * returned Quadrant (5 km) grid references are in an array to allow for the case where
 * the input grid reference is a tetrad and overlaps more than one quadrant.
 * @param {string} gr - Grid reference.
 * @returns {object} - of the form {p100000: 'gr-100km', p10000: 'gr-hectad', p5000: ['gr_quad1', ...], p2000: 'gr-tetrad', ...}, with a property for each precisions.
 */
function getLowerResGrs (gr) {

  const grType = checkGr(gr);

  const ret = {
    p100000: grType.prefix, 
    p10000: null, 
    p5000: grType.precision <= 5000 ? [] : null, 
    p2000: null, 
    p1000: null, 
    p100: null, 
    p10: null, 
    p1: null
  };

  // Set the passed in GR in the return value
  if (grType.precision === 5000) {
    ret.p5000.push(gr);
  } else {
    ret[`p${grType.precision}`] = gr;
  }
  
  const c = getCentroid(gr, grType.projection).centroid;
  const precisions = [10000, 5000, 2000, 1000, 100, 10, 1].filter(p => p > grType.precision);
  const grs = getGrFromCoords(c[0], c[1], grType.projection, grType.projection, precisions);

  precisions.forEach(p => {
    if (p === 5000) {
      if (grType.precision === 2000) {
        const hectad = gr.substring(0,gr.length-1);
        if ('ABCFGHKLM'.indexOf(gr.substr(-1)) > -1) {
          ret.p5000.push(`${hectad}SW`);
        }
        if ('KLMQRSVWX'.indexOf(gr.substr(-1)) > -1) {
          ret.p5000.push(`${hectad}SE`);
        }
        if ('CDEHIJMNP'.indexOf(gr.substr(-1)) > -1) {
          ret.p5000.push(`${hectad}NW`);
        }
        if ('MNPSTUXYZ'.indexOf(gr.substr(-1)) > -1) {
          ret.p5000.push(`${hectad}NE`);
        }
      } else {
        ret.p5000.push(grs.p5000);
      }
    } else {
      ret[`p${p}`] = grs[`p${p}`];
    }
  });
  return ret
}

export { checkGr, getCentroid, getGjson, getGrFromCoords, getLowerResGrs, pntToArea };
