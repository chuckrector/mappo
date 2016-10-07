"use strict"

const fs = require(`fs`)
const path = require(`path`)
const asset = require(`./asset`)
const detectFormat = require(`./detectFormat`)
const createMappoTileset = require(`./createMappoTileset`)
const abbrevJson = require(`./abbrevJson`)

module.exports = ({
  context,
  mapFilename,
  map,
}) => {
  let vspFilename = path.join(path.dirname(mapFilename), map.tilesetFilename)

  let vspBuffer
  try {
    vspBuffer = fs.readFileSync(vspFilename)
  } catch (exception) {
    const uppercaseTilesetFilename = map.tilesetFilename.toUpperCase()
    const uppercaseVspFilename = path.join(path.dirname(mapFilename), uppercaseTilesetFilename)
    console.log(vspFilename, `not found. trying`, uppercaseVspFilename)
    vspFilename = uppercaseVspFilename
    vspBuffer = fs.readFileSync(vspFilename)
  }

  const vspFormat = detectFormat(vspBuffer)
  console.log(`vspFormat`, vspFormat)

  let vspData
  try {
    vspData = asset.fromBuffer(vspBuffer, asset[vspFormat])
  } catch (exception) {
    console.log(exception)
    return
  }

  console.log(vspFilename, abbrevJson(vspData))

  return createMappoTileset({
    context,
    tileset: vspData,
    imageFilename: vspFilename + `.png`,
  })
}
