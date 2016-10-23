"use strict"

const fs = require(`fs`)
const createTileGridConverter = require(`./converter/createTileGridConverter`)

module.exports = tileset => {
  let pngResolver
  const pngPromise = new Promise((resolve, reject) => {
    pngResolver = resolve
  })

  if (!fs.existsSync(tileset.imageFilename)) {
    console.log(`generating`, tileset.imageFilename, `...`)

    const raw32bitData = tileset.raw32bitData
    delete tileset.raw32bitData // don't want this saved to the json

    const converter = createTileGridConverter({
      tileWidth: tileset.tileWidth,
      tileHeight: tileset.tileHeight,
      columns: tileset.tileColumns,
      tileCount: tileset.numTiles,
      raw32bitData,
    })

    const png = converter.convertToPng()
    const writer = fs.createWriteStream(tileset.imageFilename)
    png.pack().pipe(writer)
    writer.on(`finish`, pngResolver)
  } else {
    pngResolver()
  }

  let imageResolver
  const imagePromise = new Promise((resolve, reject) => {
    imageResolver = resolve
  })

  pngPromise.then(() => {
    const tilesetImage = new Image()

    tilesetImage.addEventListener(`load`, () => imageResolver(tilesetImage))
    tilesetImage.src = path.resolve(`.`, tileset.imageFilename)
  })

  return imagePromise
}
