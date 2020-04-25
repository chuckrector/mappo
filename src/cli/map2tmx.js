"use strict"

const process = require(`process`)
const fs = require(`fs`)
const path = require(`path`)
const js2xmlparser = require(`js2xmlparser`)

const abbrevJson = require(`../abbrevJson`)
const asset = require(`../asset.js`)
const loadMappoMap = require(`../loadMappoMap`)

const mapFilename = process.argv[2]
const mappoMap = loadMappoMap({mapFilename})
console.log(abbrevJson(mappoMap))

const tileset = mappoMap.tileset
const tileWidth = tileset.tileWidth
const tileHeight = tileset.tileHeight
const vspFilename = path.basename(tileset.imageFilename)
const tileColumns = 20
const tileRows = ~~((tileset.tileCount + 19) / 20)
const vspPngWidth = tileWidth * tileColumns
const vspPngHeight = tileHeight * tileRows
const obj = {
  '@': {
    version: `1.0`,
    orientation: `orthogonal`,
    width: mappoMap.tileLayers[0].width,
    height: mappoMap.tileLayers[0].height,
    tilewidth: tileWidth,
    tileheight: tileHeight,
  },
  tileset: {
    '@': {
      firstgid: 1,
      name: vspFilename,
      tilewidth: tileWidth,
      tileheight: tileHeight,
      spacing: 0,
      margin: 0,
      tilecount: tileset.tileCount,
      columns: tileColumns,
    },
    image: {
      '@': {
        source: vspFilename,
        width: vspPngWidth,
        height: vspPngHeight,
      }
    },
  }
}

obj.layer = mappoMap.mapLayerOrder.map(layerIndex => {
  const tileLayer = mappoMap.tileLayers[layerIndex]
  return {
    '@': {
      name: tileLayer.description,
      width: tileLayer.width,
      height: tileLayer.height,
    },
    data: {
      '@': {
        encoding: `csv`,
      },
      '#': tileLayer.tileIndexGrid.map(v => ++v).join(`,`),
    }
  }
})

const targetFilename = mapFilename + `.tmx`
const xml = js2xmlparser.parse(`map`, obj)
fs.writeFileSync(targetFilename, xml)

console.log(`converted`, mapFilename, `to`, targetFilename)
