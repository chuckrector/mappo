"use strict"

const $ = require('jquery')
const jQuery = $
require('./jquery-ui-1.12.0.custom.le-frog/jquery-ui.min.js')
const asset = require('./asset')
const colorDepth = require('./converter/colorDepth')

$('body').resizable()

const mapFilename = 'data/v1/BUMVILLE.MAP';
const mapData = asset.fromDisk(mapFilename, asset.v1map)

console.log(mapFilename, mapData)
console.log('nummovescripts', mapData.nummovescripts)
console.log('msbufsize', mapData.msbufsize)
console.log('msofstbl', JSON.stringify(mapData.msofstbl))
console.log('msbuf', JSON.stringify(mapData.msbuf))
console.log('numscripts', mapData.numscripts)
console.log('scriptofstbl', JSON.stringify(mapData.scriptofstbl))
console.log('mapvcs', mapData.mapvc.length)

const palFilename = 'data/v1/VERGE.PAL'
const palData = asset.fromDisk(palFilename, asset.v1pal)

const vspFilename = 'data/v1/' + mapData.vsp0name
const vspData = asset.fromDisk(vspFilename, asset.v1vsp)
console.log('vsp', vspFilename, vspData)

const raw32bitData = colorDepth.convert8to32({
  palette: palData.pal.map(v => v * 4),
  raw8bitData: vspData.vsp0,
})

const $canvas = $('.mappo-viewport')
const tileColumns = 20
const tileRows = ~~((vspData.numtiles + 19) / 20)
const context = $canvas[0].getContext('2d')
const image = context.createImageData(16, 16 * vspData.numtiles)

$canvas.attr('width', 320)
$canvas.attr('height', 240)

image.data.set(raw32bitData)

const renderTile = (tileIndex, x, y) => {
  const dirtyY = tileIndex * 16

  context.putImageData(image, x, y - dirtyY, 0, dirtyY, 16, 16)
}

const getTileIndex = (layer, tileX, tileY) => {
  return layer[(tileY * mapData.xsize) + tileX]
}

const renderLayer = (layer, x, y, transparent=false) => {
  for (let tileY = 0; tileY < 240/16; tileY++) {
    for (let tileX = 0; tileX < 320/16; tileX++) {
      const tileIndex = getTileIndex(layer, tileX, tileY)

      if (transparent && !tileIndex) {
        continue
      }

      renderTile(tileIndex, tileX * 16, tileY * 16)
    }
  }
}

renderLayer(mapData.map0, 0, 0)
renderLayer(mapData.map1, 0, 0, true)