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
const imageData = context.createImageData(16, 16 * vspData.numtiles)
const image = document.createElement('canvas')
const doubleBuffer = document.createElement('canvas')
const doubleBufferContext = doubleBuffer.getContext('2d')
const viewportWidth = 320
const viewportHeight = 240

$canvas.attr('width', viewportWidth)
$canvas.attr('height', viewportHeight)
doubleBuffer.width = viewportWidth
doubleBuffer.height = viewportHeight

imageData.data.set(raw32bitData)

// huh. putImageData carries alpha but always overwrites the destination.
// http://weblogs.asp.net/bleroy/drawing-transparent-glyphs-on-the-html-canvas
image.width = 16
image.height = 16 * vspData.numtiles
image.getContext('2d').putImageData(imageData, 0, 0)

const renderTile = (tileIndex, x, y) => {
  doubleBufferContext.drawImage(image, 0, tileIndex * 16, 16, 16, x, y, 16, 16)
}

const getTileIndex = (layer, tileX, tileY) => {
  return layer[(tileY * mapData.xsize) + tileX]
}

const renderLayer = (layer, x, y, transparent=false) => {
  const topLeftTileX = cameraX >> 4
  const topLeftTileY = cameraY >> 4
  const subTileX = cameraX % 16
  const subTileY = cameraY % 16

  for (let tileY = 0; tileY < (viewportHeight + 31) >> 4; tileY++) {
    for (let tileX = 0; tileX < (viewportWidth + 31) >> 4; tileX++) {
      const tileIndex = getTileIndex(
        layer,
        topLeftTileX + tileX,
        topLeftTileY + tileY
      )

      if (transparent && !tileIndex) {
        continue
      }

      renderTile(tileIndex, (tileX * 16) - subTileX, (tileY * 16) - subTileY)
    }
  }
}

let cameraX = 0
let cameraY = 0
let cameraVelocityX = 1
let cameraVelocityY = 1

const tick = () => {
  doubleBufferContext.filleStyle = 'red'
  doubleBufferContext.fillRect(0, 0, viewportWidth, viewportHeight)
  renderLayer(mapData.map0, cameraX, cameraY)
  renderLayer(mapData.map1, cameraX, cameraY, true)
  context.drawImage(doubleBuffer, 0, 0)

  cameraX += cameraVelocityX
  cameraY += cameraVelocityY

  if (cameraX <= 0 || cameraX >= (mapData.xsize * 16) - viewportWidth) {
    cameraVelocityX *= -1
  }

  if (cameraY <= 0 || cameraY >= (mapData.ysize * 16) - viewportHeight) {
    cameraVelocityY *= -1
  }

  window.requestAnimationFrame(tick)
}

tick()