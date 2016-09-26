"use strict"

module.exports = ({
  context,
  mapFilename,
  map,
}) => {
  const vspFilename = path.join(path.dirname(mapFilename), map.tilesetFilename)
  const vspBuffer = fs.readFileSync(vspFilename)
  const vspFormat = detectFormat(vspBuffer)
  console.log(`vspFormat`, vspFormat)

  let vspData
  try {
    vspData = asset.fromBuffer(vspBuffer, asset[vspFormat])
  } catch (exception) {
    console.log(exception)
    return
  }

  console.log(vspFilename, vspData)

  const tileset = createMappoTileset({context, tileset: vspData})

  return tileset
}
