"use strict"

const fs = require(`fs`)
const asset = require(`./asset`)
const detectFormat = require(`./detectFormat`)
const createMappoMap = require(`./createMappoMap`)
const loadMappoTileset = require(`./loadMappoTileset`)
const abbrevJson = require(`./abbrevJson`)

module.exports = ({context, mapFilename}) => {
  if (!console.group) {
    console.group = console.groupEnd = () => {}
  }
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
    console.log(mapFilename, abbrevJson(mapData))
    const map = createMappoMap({map: mapData})
    map.tileset = loadMappoTileset({context, mapFilename, map})
    return map
  } catch (exception) {
    console.error(`ack!`, exception)
  } finally {
    console.groupEnd()
  }
}
