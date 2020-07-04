/** @module src/coordsToImage */

/**
 * Given a transform object, describing a bounding rectangle in world coordinates,
 * and a height dimension, this function returns a width dimension
 * that respects the aspect ratio described by the bounding rectangle.
 * @param {object} transOpts - the transformation object
 * @param {number} outputHeight - the height, e.g. height in pixels, of an SVG element.
 * @returns {number}
 */
export function widthFromHeight(transOpts, outputHeight) {
  const realWidth = transOpts.bounds.xmax - transOpts.bounds.xmin
  const realHeight = transOpts.bounds.ymax - transOpts.bounds.ymin
  return outputHeight * realWidth/realHeight
}

/**
 * Given a transform object, describing a bounding rectangle in world coordinates,
 * and a height dimension, this function returns a new function that will accept a
 * point argument - normally describing real world coordinates - and returns a 
 * point that is transformed to be within the range 0 - outputHeight (for y)
 * and 0 - outputWidth (for x). This function can be used as input to a d3.geoTransform
 * to provide a transformation to d3.geoPath to draw an SVG path from a geojson file.
 * The transOpts argument is an object which can also describe areas which should
 * displaced in the output. This can be used for displaying islands in an
 * inset, e.g. the Channel Islands.
 * @param {object} transOpts - the transformation object
 * @param {number} outputHeight - the height, e.g. height in pixels, of an SVG element.
 * @returns {function}
 */
export function transformFunction(transOpts, outputHeight) {

  const realWidth = transOpts.bounds.xmax - transOpts.bounds.xmin
  const realHeight = transOpts.bounds.ymax - transOpts.bounds.ymin
  const outputWidth = widthFromHeight(transOpts, outputHeight)

  return function(p) {
    const x = p[0]
    const y = p[1]
    let tX, tY

    tX = outputWidth * (x-transOpts.bounds.xmin)/realWidth
    tY = outputHeight - outputHeight * (y-transOpts.bounds.ymin)/realHeight

    if (transOpts.insets && transOpts.insets.length > 0) {
      transOpts.insets.forEach(function(inset) {
      
        if (x >= inset.bounds.xmin &&  x <= inset.bounds.xmax && y >= inset.bounds.ymin &&  y <= inset.bounds.ymax) {

          const insetX = outputWidth * (inset.bounds.xmin-transOpts.bounds.xmin)/realWidth
          const insetY = outputHeight - outputHeight * (inset.bounds.ymin-transOpts.bounds.ymin)/realHeight

          // Coordinates are within bounds on an inset
          // Adjust inset origns - negative are offsets of max inset from max output

          let imageX, imageY
          if (inset.imageX < 0) {
            imageX = outputWidth + inset.imageX - ((inset.bounds.xmax - inset.bounds.xmin) / realWidth * outputWidth)
          } else {
            imageX=inset.imageX
          }
          if (inset.imageY < 0) {
            imageY = outputHeight + inset.imageY - ((inset.bounds.ymax - inset.bounds.ymin) / realHeight * outputHeight)
          } else {
            imageY=inset.imageY
          }

          tX = tX - insetX + imageX
          tY = outputHeight - imageY - (insetY - tY) 
        }
      })
    }
    return [tX, tY]
  }
}

const boundsChannelIslands_gb = {
  xmin: 337373,
  ymin: -92599,
  xmax: 427671,
  ymax: -6678
}

const boundsNorthernIsles_gb = {
  xmin: 312667,
  ymin: 980030,
  xmax: 475291,
  ymax: 1225003
}

/** @constant
  *  @description This object contains some named objects that are in the correct 
  * format to be used as transOpts arguments to some of the functions in this module.
  * Using one of these may save you generating one of your own. The main bounds element
  * indicates the extent of the main map (in real world coordinates). The bounds of
  * inset objects indicate the extent that is to be offset within the map image. The
  * imageX and imageY values of an inset object indicates the position of the offset
  * portion within the map in pixels. Positve x and y values offset the inset from the
  * left and bottom of the image respecitvely. Negative x and y values offset the inset
  * from the right and top of the image respectively.
  * <ul>
  * <li> <b>namedTransOpts.BI1</b> is a bounding box, in EPSG:27700, for the 
  * British Ilses that includes the Channel Islands in their natural position.
  * <li> <b>namedTransOpts.BI2</b> is a bounding box, in EPSG:27700, for the 
  * British Isles, that doesn't extend as far south as the 
  * Channel Islands, but with an inset covering the Channel Isles, 
  * offset 25 pixels from the bottom left corner of the output.
  * <li> <b>namedTransOpts.BI3</b> is a bounding box, in EPSG:27700, for 
  * the British Isles, that doesn't extend as far north as the Northern Isles.
  * An inset covering the Northern Isles, is offset 25 pixels from the 
  * top right corner of the output.
  * <li> <b>namedTransOpts.BI4</b> is a bounding box, in EPSG:27700, for 
  * the British Isles, that doesn't extend as far south as the 
  * Channel Islands or as far north as the Northern Isles. An inset covering 
  * the Channel Isles, is offset 25 pixels from the bottom left corner of the output.
  * An inset covering the Northern Isles, is offset 25 pixels from the 
  * top right corner of the output.
  * </ul>
  *  @type {object}
*/
export const namedTransOpts = {
  BI1: {
    bounds: {
      xmin: -213389,
      ymin: -113239,
      xmax: 702813,
      ymax: 1237242
    },
  },
  BI2: {
    bounds: {
      xmin: -213389,
      ymin: -9939,
      xmax: 702813,
      ymax: 1237242
    },
    insets: [{
      bounds: boundsChannelIslands_gb,
      imageX: 25,
      imageY: 25
    }]
  },
  BI3: {
    bounds: {
      xmin: -213389,
      ymin: -9939,
      xmax: 702813,
      ymax: 1050000
    },
    insets: [{
      bounds: boundsNorthernIsles_gb,
      imageX: -25,
      imageY: -25
    }]
  },
  BI4: {
    bounds: {
      xmin: -213389,
      ymin: -9939,
      xmax: 702813,
      ymax: 1050000
    },
    insets: [{
      bounds: boundsChannelIslands_gb,
      imageX: 25,
      imageY: 25
    },
    {
      bounds: boundsNorthernIsles_gb,
      imageX: -25,
      imageY: -25
    }]
  }
}



export function getTweenTransOpts(from){
  
  const transOpts = namedTransOpts[from]
  if (!transOpts.insets) {
    transOpts.insets = []
  }

  let insetCi, insetNi
  transOpts.insets.forEach(function(i){
    
    if (i.bounds.x === boundsChannelIslands_gb.x) {
      insetCi = true
    }
    if (i.bounds.x === boundsNorthernIsles_gb.x) {
      insetNi = true
    }
  })

  if (!insetCi) {
    transOpts.insets.unshift({
      bounds: boundsChannelIslands_gb,
      imageX: 25,
      imageY: 25
    })
  }

  if (!insetNi) {
    transOpts.insets.push({
      bounds: boundsNorthernIsles_gb,
      imageX: -25,
      imageY: -25
    })
  }

  return transOpts
}

