/** @module src/coordsToImage */

/**
 * Given a transform object, describing a bounding rectangle in world coordinates,
 * and a height dimension, this function returns an array of objects - one
 * for each inset described in the transform object - that describe a set of
 * rectangles corresponding to each of the insets. Each object has an origin
 * corresponding to the top left of the rectangle, a width and a height dimension.
 * The dimensions and coordiates are relative to the height argument. A typical
 * use of these metrics would be to draw an SVG rectagle around an inset.
 * @param {object} transOpts - the transformation object
 * @param {number} outputHeight - the height, e.g. height in pixels, of an SVG element.
 * @returns {Array<Object>}
 */
export function getInsetDims(transOpts, outputHeight) {

  const outputWidth = widthFromHeight(transOpts, outputHeight)
  const transform = transformFunction(transOpts, outputHeight)
  const insetDims = []
  
  if (transOpts.insets) {
    transOpts.insets.forEach(function(inset) {
      const ll = transform([inset.bounds.xmin, inset.bounds.ymin])
      const ur = transform([inset.bounds.xmax, inset.bounds.ymax])
      const iWidth = ur[0]-ll[0]
      const iHeight = ll[1]-ur[1]

      insetDims.push ({
        x: inset.imageX < 0 ? outputWidth - iWidth + inset.imageX : inset.imageX,
        y: inset.imageY < 0 ? - inset.imageY : outputHeight - inset.imageY - iHeight,
        width: iWidth,
        height: iHeight
      })
    })
  }
  return insetDims
}

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
          if (inset.imageX < 0 && !transOpts.forTween) {
            imageX = outputWidth + inset.imageX - ((inset.bounds.xmax - inset.bounds.xmin) / realWidth * outputWidth)
          } else {
            imageX=inset.imageX
          }
          if (inset.imageY < 0 && !transOpts.forTween) {
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

// Defined insets required for namedTransOpts
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

/**
 * Given both 'from' and 'to' transform objects, an output height and a
 * 'tween' value between 0 and 1, this function returns a transform object
 * for which the map bounds, the inset bounds and the inset image position
 * are all interpolated between the 'from' and 'to' objects at a position
 * depending on the value of the tween value. Typically this would then be used
 * to help generate a path transformation to use with D3 to animate transitions
 * between different map transformations. Note that this only works with
 * named transformation objects defined in this library.
 * @param {object} from - the 'from' transformation object.
 * @param {object} to - the 'to' transformation object.
 * @param {number} outputHeight - the height, e.g. height in pixels, of an SVG element.
 * @param {number} tween - between 0 and 1 indicating the interpolation position.
 * @returns {object} - in intermediate transformation object.
 */
export function getTweenTransOpts(from, to, outputHeight, tween){
  
  const fto = copyTransOptsForTween(namedTransOpts[from], outputHeight)
  const tto = copyTransOptsForTween(namedTransOpts[to], outputHeight)

  let rto = {
    bounds: {
      xmin: fto.bounds.xmin + (tto.bounds.xmin - fto.bounds.xmin) * tween,
      xmax: fto.bounds.xmax + (tto.bounds.xmax - fto.bounds.xmax) * tween,
      ymin: fto.bounds.ymin + (tto.bounds.ymin - fto.bounds.ymin) * tween,
      ymax: fto.bounds.ymax + (tto.bounds.ymax - fto.bounds.ymax) * tween
    },
    insets: [],
    forTween: true // Means that negative image positions won't be translated by transformFunction
  }
  fto.insets.forEach(function(i,idx){
    rto.insets.push({
      bounds: {
        xmin: i.bounds.xmin + (tto.insets[idx].bounds.xmin - i.bounds.xmin) * tween,
        xmax: i.bounds.xmax + (tto.insets[idx].bounds.xmax - i.bounds.xmax) * tween,
        ymin: i.bounds.ymin + (tto.insets[idx].bounds.ymin - i.bounds.ymin) * tween,
        ymax: i.bounds.ymax + (tto.insets[idx].bounds.ymax - i.bounds.ymax) * tween
      },
      imageX: i.imageX + (tto.insets[idx].imageX - i.imageX) * tween,
      imageY: i.imageY + (tto.insets[idx].imageY - i.imageY) * tween
    })
  })
  return rto
}

function copyTransOptsForTween(transOpts, outputHeight) {

  // This function makes a copy of a transformation object. The copy is different
  // from the original in two respects. Firstly the image positions of the insets
  // are expressed as positive numbers (from bottom or left of image)
  // even when expressed as negative offsets (from top or right of image) in the
  // original. Secondly all named insets used in this library are represented in
  // the returned object even if not present in the original. Such insets are
  // given image positions that reflect their real world positions.

  const insetDims = getInsetDims(transOpts, outputHeight)

  let tto = {
    bounds: {
      xmin: transOpts.bounds.xmin,
      xmax: transOpts.bounds.xmax,
      ymin: transOpts.bounds.ymin,
      ymax: transOpts.bounds.ymax
    },
    insets: []
  }
  if (transOpts.insets){
    transOpts.insets.forEach(function(i, idx){
      const iNew = {
        bounds: {
          xmin: i.bounds.xmin,
          xmax: i.bounds.xmax,
          ymin: i.bounds.ymin,
          ymax: i.bounds.ymax
        },
      }
      // Usng the calculated insetDims translates any negative numbers - used
      // as shorthand for defining position offsets from top or right margin - to 
      // positive values from bottom and left.
      iNew.imageX = insetDims[idx].x,
      iNew.imageY = outputHeight - insetDims[idx].y - insetDims[idx].height
      tto.insets.push(iNew)
    })
  }

  let insetCi, insetNi
  tto.insets.forEach(function(i){
    if (i.bounds.xmin === boundsChannelIslands_gb.xmin) {
      insetCi = true
    }
    if (i.bounds.xmin === boundsNorthernIsles_gb.xmin) {
      insetNi = true
    }
  })

  if (!insetCi) {
    tto.insets.unshift({
      bounds: boundsChannelIslands_gb,
      imageX: (boundsChannelIslands_gb.xmin - tto.bounds.xmin) / (tto.bounds.xmax - tto.bounds.xmin) * widthFromHeight(tto, outputHeight),
      imageY: (boundsChannelIslands_gb.ymin - tto.bounds.ymin) / (tto.bounds.ymax - tto.bounds.ymin) * outputHeight
    })
  }

  if (!insetNi) {
    tto.insets.push({
      bounds: boundsNorthernIsles_gb,
      imageX: (boundsNorthernIsles_gb.xmin - tto.bounds.xmin) / (tto.bounds.xmax - tto.bounds.xmin) * widthFromHeight(tto, outputHeight),
      imageY: (boundsNorthernIsles_gb.ymin - tto.bounds.ymin ) / (tto.bounds.ymax - tto.bounds.ymin) * outputHeight
    })
  }
  return tto
}