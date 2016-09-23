"use strict"

const asset = require('./asset')
const colorDepth = require('./converter/colorDepth')
const clamp = require('lodash/clamp')
const glob = require('glob')
const createMappoSession = require('./createMappoSession')
const createMappoMap = require('./createMappoMap')
const createMappoTileset = require('./createMappoTileset')
const convertRaw32bitDataToImageBitmap = require('./convertRaw32bitDataToImageBitmap')
const detectFormat = require('./detectFormat')
const path = require('path')
const fs = require('fs')

const mappoSession = createMappoSession({
  fileSystem: {
    files: glob.sync(process.cwd() + '/**/*.map', {nocase: true}),
  },
  launchFolder: process.cwd(),
})

const mappoState = {
  isLoading: true,
  map: null,
  tileset: null,
  tilesetBitmap: null,
  cameraX: 0,
  cameraY: 0,
  cameraMoveX: 0,
  cameraMoveY: 0,
  cameraScrollAmount: 1,
}

const mapList = document.querySelector('.map-list')
mappoSession.getMapFilenames().forEach(mapFilename => {
  const li = document.createElement('li')
  li.innerText = mapFilename
  li.addEventListener('click', event => loadMap(mapFilename))
  mapList.appendChild(li)
})

console.log('launchFolder', process.cwd())

const loadMap = mapFilename => {
  console.group()
  try {
    mappoState.isLoading = true

    mappoState.cameraX = 0
    mappoState.cameraY = 0

    const mapBuffer = fs.readFileSync(mapFilename)
    const mapFormat = detectFormat(mapBuffer)
    if (!mapFormat.includes('map')) {
      console.error('expected map but got', mapFormat)
      return
    }
    console.log('mapFormat', mapFormat)
    let mapData
    try {
      mapData = asset.fromBuffer(mapBuffer, asset[mapFormat])
    } catch (exception) {
      console.log(exception)
      return
    }
    mappoState.map = createMappoMap({map: mapData})
    console.log(mapFilename, mapData)

    const vspFilename = path.join(
      path.dirname(mapFilename),
      mappoState.map.tilesetFilename
    )
    const vspBuffer = fs.readFileSync(vspFilename)
    const vspFormat = detectFormat(vspBuffer)
    console.log('vspFormat', vspFormat)
    let vspData
    try {
      vspData = asset.fromBuffer(vspBuffer, asset[vspFormat])
    } catch (exception) {
      console.log(exception)
      return
    }
    mappoState.tileset = createMappoTileset({tileset: vspData})
    console.log(vspFilename, vspData)

    convertRaw32bitDataToImageBitmap({
      context,
      raw32bitData: mappoState.tileset.raw32bitData,
      width: mappoState.tileset.tileWidth,
      height: mappoState.tileset.tileHeight,
      numTiles: mappoState.tileset.numTiles,
    }).then(tilesetBitmap => {
      mappoState.tilesetBitmap = tilesetBitmap
      mappoState.isLoading = false
    })
  } catch (exception) {
    console.error('ack!', exception)
  } finally {
    console.groupEnd()
  }
}

const canvas = document.querySelector('.mappo-viewport')
const context = canvas.getContext('2d')

const viewportWidth = 320
const viewportHeight = 240
const scale = 3

canvas.width = viewportWidth
canvas.height = viewportHeight

const renderTileHighlight = ({x, y, width=16, height=16}) => {
  context.strokeStyle = 'white'
  context.globalCompositeOperation = 'exclusion'
  context.lineWidth = 2
  context.strokeRect(~~x, ~~y, 16, 16)
}

const renderTile = (tileIndex, x, y) => {
  context.drawImage(mappoState.tilesetBitmap, 0, tileIndex * 16, 16, 16, x, y, 16, 16)
}

const getTileIndex = (layer, tileX, tileY) => {
  return layer.tileIndexGrid[(tileY * layer.width) + tileX]
}

const renderLayer = (layer, x, y, transparent=false) => {
  x = ~~x
  y = ~~y

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

const KEYCODE_UP = 38
const KEYCODE_DOWN = 40
const KEYCODE_LEFT = 37
const KEYCODE_RIGHT = 39
const keyPressed = {}

document.addEventListener('keydown', event => keyPressed[event.keyCode] = true)
document.addEventListener('keyup', event => keyPressed[event.keyCode] = false)

let mousedown = false
let mousein = false
canvas.addEventListener('mousedown', event => {
  mousedown = true
})

let hoverCanvasCoord = null
let autoScrollX = 0
let autoScrollY = 0
canvas.addEventListener('mousemove', event => {
  if (mousedown) {
    moveCamera(
      -event.movementX / scale,
      -event.movementY / scale
    )
  }

  autoScrollX = 0
  autoScrollY = 0
  const autoScrollThreshold = 16;
  if (mousein) {
    event.offsetX < autoScrollThreshold * scale && (autoScrollX = -1);
    event.offsetX >= (viewportWidth - autoScrollThreshold) * scale && (autoScrollX = +1);
    event.offsetY < autoScrollThreshold * scale && (autoScrollY = -1);
    event.offsetY >= (viewportHeight - autoScrollThreshold) * scale && (autoScrollY = +1);
  }

  hoverCanvasCoord = {
    x: ~~(event.offsetX / scale),
    y: ~~(event.offsetY / scale),
  }
})

canvas.addEventListener('mouseup', event => {
  mousedown = false
})

canvas.addEventListener('mouseenter', event => {
  mousein = true
})

canvas.addEventListener('mouseout', event => {
  mousein = false
  mappoState.cameraMoveX = 0
  mappoState.cameraMoveY = 0
  autoScrollX = 0
  autoScrollY = 0
  hoverCanvasCoord = null
})

const moveCamera = (moveX, moveY) => {
  mappoState.cameraX = clamp(mappoState.cameraX + moveX, 0, (mappoState.map.tileLayers[0].width * mappoState.tileset.tileWidth) - viewportWidth)
  mappoState.cameraY = clamp(mappoState.cameraY + moveY, 0, (mappoState.map.tileLayers[0].height * mappoState.tileset.tileHeight) - viewportHeight)
}

const tick = () => {
  context.globalCompositeOperation = 'source-over'
  context.fillStyle = 'black'
  context.fillRect(0, 0, viewportWidth, viewportHeight)

  if (!mappoState.isLoading) {
    mappoState.map.tileLayers.forEach((tileLayer, layerIndex) => {
      renderLayer(
        tileLayer,
        mappoState.cameraX * tileLayer.parallax.x,
        mappoState.cameraY * tileLayer.parallax.y,
        layerIndex > 0 // transparent
      )
    })

    if (hoverCanvasCoord) {
      renderTileHighlight({
        x: hoverCanvasCoord.x - ((~~mappoState.cameraX + hoverCanvasCoord.x) % 16),
        y: hoverCanvasCoord.y - ((~~mappoState.cameraY + hoverCanvasCoord.y) % 16),
      })
    }

    mappoState.cameraMoveX = 0
    mappoState.cameraMoveY = 0;
    (keyPressed[KEYCODE_UP] || autoScrollY < 0) && (mappoState.cameraMoveY = -mappoState.cameraScrollAmount);
    (keyPressed[KEYCODE_DOWN] || autoScrollY > 0) && (mappoState.cameraMoveY = +mappoState.cameraScrollAmount);
    (keyPressed[KEYCODE_LEFT] || autoScrollX < 0) && (mappoState.cameraMoveX = -mappoState.cameraScrollAmount);
    (keyPressed[KEYCODE_RIGHT] || autoScrollX > 0) && (mappoState.cameraMoveX = +mappoState.cameraScrollAmount);
    moveCamera(mappoState.cameraMoveX, mappoState.cameraMoveY)
  }

  window.requestAnimationFrame(tick)
}

tick()
