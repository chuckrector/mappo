"use strict"

const asset = require('./asset')
const colorDepth = require('./converter/colorDepth')
const clamp = require('lodash/clamp')

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

const canvas = document.querySelector('.mappo-viewport')
const tileColumns = 20
const tileRows = ~~((vspData.numtiles + 19) / 20)
const context = canvas.getContext('2d')
const imageData = context.createImageData(16, 16 * vspData.numtiles)
const image = document.createElement('canvas')
const viewportWidth = 320
const viewportHeight = 240

canvas.width = viewportWidth
canvas.height = viewportHeight

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

const KEYCODE_UP = 38
const KEYCODE_DOWN = 40
const KEYCODE_LEFT = 37
const KEYCODE_RIGHT = 39
const keyPressed = {}

document.addEventListener('keydown', event => keyPressed[event.keyCode] = true)
document.addEventListener('keyup', event => keyPressed[event.keyCode] = false)

let mousedown = false
canvas.addEventListener('mousedown', event => {
  mousedown = true
})

canvas.addEventListener('mousemove', event => {
  if (mousedown) {
    moveCamera(
      ~~(-event.movementX / 3),
      ~~(-event.movementY / 3)
    )
  }
})

canvas.addEventListener('mouseup', event => {
  mousedown = false
})

const moveCamera = (moveX, moveY) => {
  cameraX = clamp(cameraX + moveX, 0, (mapData.xsize * 16) - viewportWidth)
  cameraY = clamp(cameraY + moveY, 0, (mapData.ysize * 16) - viewportHeight)
}

const tick = () => {
  context.fillStyle = 'black'
  context.fillRect(0, 0, viewportWidth, viewportHeight)
  renderLayer(mapData.map0, cameraX, cameraY)
  renderLayer(
    mapData.map1,
    ~~(cameraX * mapData.pmultx / mapData.pdivx),
    ~~(cameraY * mapData.pmultx / mapData.pdivx),
    true
  )

  let moveX = 0
  let moveY = 0
  keyPressed[KEYCODE_UP] && moveY--
  keyPressed[KEYCODE_DOWN] && moveY++
  keyPressed[KEYCODE_LEFT] && moveX--
  keyPressed[KEYCODE_RIGHT] && moveX++
  moveCamera(moveX, moveY)

  window.requestAnimationFrame(tick)
}

tick()