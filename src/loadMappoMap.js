"use strict"

const loadMappoTileset = require(`./loadMappoTileset`)

module.exports = ({context, mapFilename}) => {
  console.group()
  try {
    const mapBuffer = fs.readFileSync(mapFilename)
    const mapFormat = detectFormat(mapBuffer)
    if (!mapFormat.includes(`map`)) {
      console.error(`expected map but got`, mapFormat)
      return
    }
    console.log(`mapFormat`, mapFormat)
    let mapData
    try {
      mapData = asset.fromBuffer(mapBuffer, asset[mapFormat])
    } catch (exception) {
      console.log(exception)
      return
    }
    console.log(mapFilename, mapData)
    const map = createMappoMap({map: mapData})
    map.tileset = loadMappoTileset({context, mapFilename, map})
    return map
  } catch (exception) {
    console.error(`ack!`, exception)
  } finally {
    console.groupEnd()
  }
}
