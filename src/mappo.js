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
  mapLayerOrder: null,
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

const scale = 3

const renderTileHighlight = ({
  x,
  y,
  width=mappoState.tileset.tileWidth,
  height=mappoState.tileset.tileHeight,
}) => {
  context.strokeStyle = 'white'
  context.globalCompositeOperation = 'exclusion'
  context.lineWidth = 2
  context.strokeRect(~~x, ~~y, width, height)
}

const renderTile = (tileIndex, x, y) => {
  context.drawImage(
    mappoState.tilesetBitmap,
    0, tileIndex * mappoState.tileset.tileHeight,
    mappoState.tileset.tileWidth,
    mappoState.tileset.tileHeight,
    x, y,
    mappoState.tileset.tileWidth,
    mappoState.tileset.tileHeight
  )
}

const getTileIndex = (layer, tileX, tileY) => {
  return layer.tileIndexGrid[(tileY * layer.width) + tileX]
}

const renderLayer = (layer, x, y, transparent=false) => {
  x = ~~x
  y = ~~y

  const tileWidth = mappoState.tileset.tileWidth
  const tileHeight = mappoState.tileset.tileHeight
  const tileStartX = Math.floor(x / tileWidth)
  const tileStartY = Math.floor(y / tileHeight)
  const subTileX = x % tileWidth
  const subTileY = y % tileHeight
  const pixelStartX = -subTileX
  const pixelStartY = -subTileY
  const pixelEndX = canvas.width
  const pixelEndY = canvas.height

  let pixelY = pixelStartY
  let tileY = tileStartY
  while (pixelY < pixelEndY) {
    let pixelX = pixelStartX
    let tileX = tileStartX
    while (pixelX < pixelEndX) {
      const tileIndex = getTileIndex(layer, tileX, tileY)

      if (tileIndex || !transparent) {
        renderTile(tileIndex, pixelX, pixelY)
      }

      pixelX += tileWidth
      tileX++
    }

    pixelY += tileHeight
    tileY++
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
  if (mappoState.isLoading) {
    return
  }

  if (mousedown) {
    moveCamera(
      -event.movementX / scale,
      -event.movementY / scale
    )
  }

  autoScrollX = 0
  autoScrollY = 0
  const autoScrollThreshold = (mappoState.tileset.tileWidth + mappoState.tileset.tileHeight) / 2;
  if (mousein) {
    event.offsetX < autoScrollThreshold * scale && (autoScrollX = -1);
    event.offsetX >= (canvas.width - autoScrollThreshold) * scale && (autoScrollX = +1);
    event.offsetY < autoScrollThreshold * scale && (autoScrollY = -1);
    event.offsetY >= (canvas.height - autoScrollThreshold) * scale && (autoScrollY = +1);
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
  mappoState.cameraX = clamp(mappoState.cameraX + moveX, 0, (mappoState.map.tileLayers[0].width * mappoState.tileset.tileWidth) - canvas.width)
  mappoState.cameraY = clamp(mappoState.cameraY + moveY, 0, (mappoState.map.tileLayers[0].height * mappoState.tileset.tileHeight) - canvas.height)
}

const tick = () => {
  context.globalCompositeOperation = 'source-over'
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height)

  if (!mappoState.isLoading) {
    mappoState.map.mapLayerOrder.forEach(layerIndex => {
      const tileLayer = mappoState.map.tileLayers[layerIndex]

      renderLayer(
        tileLayer,
        mappoState.cameraX * tileLayer.parallax.x,
        mappoState.cameraY * tileLayer.parallax.y,
        layerIndex > 0 // transparent
      )
    })

    if (hoverCanvasCoord) {
      renderTileHighlight({
        x: hoverCanvasCoord.x - ((~~mappoState.cameraX + hoverCanvasCoord.x) % mappoState.tileset.tileWidth),
        y: hoverCanvasCoord.y - ((~~mappoState.cameraY + hoverCanvasCoord.y) % mappoState.tileset.tileHeight),
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

const rightSide = document.querySelector('.right-side')

const resizeCanvas = () => {
  canvas.width = ~~((rightSide.offsetWidth + (scale - 1)) / scale)
  canvas.height = ~~((rightSide.offsetHeight + (scale - 1)) / scale)
  console.log('resized', canvas.width, canvas.height)
}

window.addEventListener('resize', resizeCanvas)
resizeCanvas()

tick()

