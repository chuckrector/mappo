"use strict"

const $ = require('jquery')
const jQuery = $
const asset = require('./asset')
const colorDepth = require('./converter/colorDepth')

const mapFilename = 'data/v1/TEST.MAP';
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
const viewportWidth = 320
const viewportHeight = 240

$canvas.attr('width', viewportWidth)
$canvas.attr('height', viewportHeight)

imageData.data.set(raw32bitData)

// huh. putImageData carries alpha but always overwrites the destination.
// http://weblogs.asp.net/bleroy/drawing-transparent-glyphs-on-the-html-canvas
image.width = 16
image.height = 16 * vspData.numtiles
image.getContext('2d').putImageData(imageData, 0, 0)

const renderTile = (tileIndex, x, y) => {
  context.drawImage(image, 0, tileIndex * 16, 16, 16, x, y, 16, 16)
}

const getTileIndex = (layer, tileX, tileY) => {
  return layer[(tileY * mapData.xsize) + tileX]
}

const renderLayer = (layer, x, y, transparent=false) => {
  const topLeftTileX = x >> 4
  const topLeftTileY = y >> 4
  const subTileX = x % 16
  const subTileY = y % 16

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
  context.filleStyle = 'red'
  context.fillRect(0, 0, viewportWidth, viewportHeight)
  renderLayer(mapData.map0, cameraX, cameraY)
  renderLayer(
    mapData.map1,
    cameraX * mapData.pmultx / mapData.pdivx,
    cameraY * mapData.pmultx / mapData.pdivx,
    true
  )

  cameraX += cameraVelocityX
  cameraY += cameraVelocityY

  if (cameraX <= 0 || cameraX >= 100 * 16) {
    cameraVelocityX *= -1
  }

  if (cameraY <= 0 || cameraY >= 80 * 16) {
    cameraVelocityY *= -1
  }

  window.requestAnimationFrame(tick)
}

tick()