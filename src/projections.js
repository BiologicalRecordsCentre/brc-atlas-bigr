/** @module src/projections */

/** @constant
  * @description This object describes the coordinate reference systems used in this project corresponding
  * to the British National Grid, Irish Grid, UTM zone 30N (used for the Channel Islands)  and WGS 84. The object contains
  * four properties, each named with the two letter code used throughout this package to represent one of the
  * three systems: gb, ir, ci and wg. Each of these properties provides access to an object defining the name,
  * epsg code and proj4 string for the CRS.
  * @type {array}
*/

export default {
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
}