export function widthFromHeight(transOpts, outputHeight) {
  const realWidth = transOpts.bounds.xmax - transOpts.bounds.xmin
  const realHeight = transOpts.bounds.ymax - transOpts.bounds.ymin
  return outputHeight * realWidth/realHeight
}

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
        const insetX = outputWidth * (inset.bounds.xmin-transOpts.bounds.xmin)/realWidth
        const insetY = outputHeight - outputHeight * (inset.bounds.ymin-transOpts.bounds.ymin)/realHeight

        if (x >= inset.bounds.xmin &&  x <= inset.bounds.xmax && y >= inset.bounds.ymin &&  y <= inset.bounds.ymax) {
          // Coordinates are within bounds on an inset
          tX = tX - insetX + inset.imageX
          tY = outputHeight - inset.imageY - (insetY - tY) 
        }
      })
    }
    return [tX, tY]
  }
}

export const namedTransOpts = {
  BritishIsles1: {
    bounds: {
      xmin: -213389,
      ymin: -113239,
      xmax: 702813,
      ymax: 1237242
    },
  },
  BritishIslesWithCIinset1: {
    bounds: {
      xmin: -213389,
      ymin: -9939,
      xmax: 702813,
      ymax: 1237242
    },
    insets: [{
      bounds: {
        xmin: 337373,
        ymin: -92599,
        xmax: 427671,
        ymax: -6678
      },
      imageX: 25,
      imageY: 25
    }]
  }
}