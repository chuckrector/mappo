"use strict"

const asset = require('./asset')
const colorDepth = require('./converter/colorDepth')
const clamp = require('lodash/clamp')
const glob = require('glob')
const createMappoSession = require('./createMappoSession')
const createMappoMap = require('./createMappoMap')
const createMappoTileset = require('./createMappoTileset')
const detectFormat = require('./detectFormat')
const path = require('path')
const fs = require('fs')
const setupKeyboard = require('./setupKeyboard')
const renderTileHighlightInvertedOutline = require('./renderTileHighlightInvertedOutline')
const renderTileHighlightInvertedSolid = require('./renderTileHighlightInvertedSolid')
const renderTileHighlightColorOutline = require('./renderTileHighlightColorOutline')

// DOM REFERENCES
const pageTitle = document.querySelector('title')
const mapList = document.querySelector('.map-list')
const layerList = document.querySelector('.layer-list')
const canvas = document.querySelector('.mappo-viewport')
const context = canvas.getContext('2d')
const tilesetCanvasContainer = document.querySelector('.tileset-canvas-container')
const tilesetCanvas = document.querySelector('.tileset-canvas')
const tilesetContext = tilesetCanvas.getContext('2d')
const tilesetSelectedTileCanvas = document.querySelector('.tileset-selected-tile-canvas')
const tilesetSelectedTileContext = tilesetSelectedTileCanvas.getContext('2d')
const tilesetSelectedTileIndex = document.querySelector('.tileset-selected-tile-index')
const tilesetHoveringTileCanvas = document.querySelector('.tileset-hovering-tile-canvas')
const tilesetHoveringTileContext = tilesetHoveringTileCanvas.getContext('2d')
const tilesetHoveringTileIndex = document.querySelector('.tileset-hovering-tile-index')
const middlePanel = document.querySelector('.middle-panel')

// CHECKERBOARD PATTERN
const checkerboardCanvas = document.createElement('canvas')
const checkerboardCanvasContext = checkerboardCanvas.getContext('2d')
checkerboardCanvas.width = 16
checkerboardCanvas.height = 16
checkerboardCanvasContext.fillStyle = 'white'
checkerboardCanvasContext.fillRect(0, 0, 16, 16)
checkerboardCanvasContext.fillStyle = 'silver'
checkerboardCanvasContext.fillRect(0, 0, 8, 8)
checkerboardCanvasContext.fillRect(8, 8, 8, 8)
const checkerboardPattern = checkerboardCanvasContext.createPattern(checkerboardCanvas, 'repeat')

const launchFolder = 'data' // TODO(chuck): temp hack for windows. empty string dunna work
console.log('launchFolder', launchFolder)
const mapGlob = '**/*.map'
const mapFilenames = glob.sync(mapGlob, {nocase: true})
const mappoSession = createMappoSession({
  fileSystem: {
    files: mapFilenames
  },
  launchFolder
})

const viewportScales = [0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const DEFAULT_SCALE_INDEX = 4
const defaultMappoState = {
  scaleIndex: DEFAULT_SCALE_INDEX,
  isLoading: true,
  map: null,
  mapLayerOrder: null,
  mapLayerSelected: null,
  tileset: null,
  tilesetHoverTileX: 0,
  tilesetHoverTileY: 0,
  tilesetHoverIndex: 0,
  tilesetSelectedTileX: 0,
  tilesetSelectedTileY: 0,
  tilesetSelectedIndex: 0,
  cameraX: 0,
  cameraY: 0,
  cameraMoveX: 0,
  cameraMoveY: 0,
  cameraScrollAmount: 1,
  keyPressed: {},
}
let mappoState = Object.assign({}, defaultMappoState)

const getScale = () => viewportScales[mappoState.scaleIndex]

mappoSession.getMapFilenames().forEach(mapFilename => {
  const li = document.createElement('li')
  li.setAttribute('title', mapFilename)
  li.innerText = mapFilename
  // TODO(chuck): temp hack for windows. figure out better launchFolder shenanigans
  li.addEventListener('click', event => {
    loadMap('data/' + mapFilename)
    pageTitle.innerText = 'Mappo - ' + mapFilename
  })
  mapList.appendChild(li)
})

const refreshMapLayerList = () => {
  layerList.innerHTML = ''
  mappoState.map.tileLayers.forEach((layer, index) => {
    const li = document.createElement('li')
    li.setAttribute('title', layer.description)
    li.innerText = layer.description
    li.classList.add('layer-list-item')
    if (mappoState.mapLayerSelected === layer) {
      li.classList.add('selected')
    }
    li.addEventListener('click', event => {
      // TODO(chuck): use a proper element?
      if (event.offsetX < 35) {
        li.classList.toggle('is-layer-hidden')
        layer.isHidden = !layer.isHidden
      }
      mappoState.mapLayerSelected = layer
      const layerListItems = document.querySelectorAll('.layer-list .layer-list-item')
      layerListItems.forEach(layerListItem => {
        layerListItem.classList.remove('selected')
      })
      li.classList.add('selected')
    })
    layerList.appendChild(li)
  })
}

const loadMap = mapFilename => {
  console.group()
  try {
    mappoState = Object.assign({}, defaultMappoState)
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
    mappoState.mapLayerSelected = mappoState.map.tileLayers[mappoState.map.mapLayerOrder[0]]
    refreshMapLayerList()

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
    mappoState.tileset = createMappoTileset({context, tileset: vspData})
    console.log(vspFilename, vspData)
    tilesetSelectedTileCanvas.width = mappoState.tileset.tileWidth
    tilesetSelectedTileCanvas.height = mappoState.tileset.tileHeight
    tilesetHoveringTileCanvas.width = mappoState.tileset.tileWidth
    tilesetHoveringTileCanvas.height = mappoState.tileset.tileHeight

    mappoState.tileset.imageBitmapPromise.then(() => {
      mappoState.isLoading = false
      resizeCanvas()
    })
  } catch (exception) {
    console.error('ack!', exception)
  } finally {
    console.groupEnd()
  }
}

const renderTile = ({
  context,
  tileIndex,
  x,
  y,
  scaleWidth=mappoState.tileset.tileWidth,
  scaleHeight=mappoState.tileset.tileHeight,
}) => {
  context.drawImage(
    mappoState.tileset.imageBitmap,
    0, tileIndex * mappoState.tileset.tileHeight,
    mappoState.tileset.tileWidth,
    mappoState.tileset.tileHeight,
    x, y,
    scaleWidth,
    scaleHeight
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
  let pixelEndX = canvas.width
  let pixelEndY = canvas.height
  let tileEndX = Math.floor(pixelEndX / tileWidth)
  let tileEndY = Math.floor(pixelEndX / tileHeight)
  if (tileEndX > layer.width) {
    const tileOverflow = tileEndX - layer.width
    tileEndX = layer.width
    pixelEndX -= tileOverflow * tileWidth
  }
  if (tileEndY > layer.height) {
    const tileOverflow = tileEndY - tileHeight
    tileEndY = layer.height
    pixelEndY -= tileOverflow * tileHeight
  }

  let pixelY = pixelStartY
  let tileY = tileStartY
  while (pixelY < pixelEndY) {
    let pixelX = pixelStartX
    let tileX = tileStartX
    while (pixelX < pixelEndX) {
      const tileIndex = getTileIndex(layer, tileX, tileY)

      if (tileIndex || !transparent) {
        renderTile({context, tileIndex, x: pixelX, y: pixelY})
      }

      pixelX += tileWidth
      tileX++
    }

    pixelY += tileHeight
    tileY++
  }
}

const keyboard = setupKeyboard({
  addEventListener: document.addEventListener,
  keyPressed: mappoState.keyPressed,
})

let mousedown = false
let mousein = false
middlePanel.addEventListener('mousedown', event => {
  mousedown = true
})

let hoverCanvasCoord = null
let autoScrollX = 0
let autoScrollY = 0
middlePanel.addEventListener('mousemove', event => {
  if (mappoState.isLoading) {
    return
  }

  const scale = getScale()
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
    const mouseX = event.offsetX
    const mouseY = event.offsetY
    const autoScrollRight = middlePanel.offsetWidth - autoScrollThreshold * scale
    const autoScrollDown = middlePanel.offsetHeight - autoScrollThreshold * scale
    if (mouseX < autoScrollThreshold) {
      autoScrollX = -1
    }
    if (mouseX >= autoScrollRight) {
      autoScrollX = +1
    }
    if (mouseY < autoScrollThreshold) {
      autoScrollY = -1
    }
    if (mouseY >= autoScrollDown) {
      autoScrollY = +1
    }
  }

  hoverCanvasCoord = {
    x: ~~(event.offsetX / getScale()),
    y: ~~(event.offsetY / getScale()),
  }
})

tilesetCanvasContainer.addEventListener('mousemove', event => {
  if (mappoState.isLoading) {
    return
  }

  const scale = getScale()
  const hoverTileX = ~~(event.offsetX / (mappoState.tileset.tileWidth * scale))
  const hoverTileY = ~~(event.offsetY / (mappoState.tileset.tileHeight * scale))
  const hoverTileIndex = (hoverTileY * getTilesetColumns()) + hoverTileX

  mappoState.tilesetHoverTileX = hoverTileX
  mappoState.tilesetHoverTileY = hoverTileY
  mappoState.tilesetHoverIndex = hoverTileIndex
})

tilesetCanvasContainer.addEventListener('click', event => {
  if (mappoState.isLoading) {
    return
  }

  const scale = getScale()
  const selectedTileX = ~~(event.offsetX / (mappoState.tileset.tileWidth * scale))
  const selectedTileY = ~~(event.offsetY / (mappoState.tileset.tileHeight * scale))
  const selectedTileIndex = (selectedTileY * getTilesetColumns()) + selectedTileX

  mappoState.tilesetSelectedTileX = selectedTileX
  mappoState.tilesetSelectedTileY = selectedTileY
  mappoState.tilesetSelectedIndex = selectedTileIndex
})

middlePanel.addEventListener('mouseup', event => {
  mousedown = false
})

middlePanel.addEventListener('mouseenter', event => {
  mousein = true
})

middlePanel.addEventListener('mouseout', event => {
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

const clearCanvas = (canvas) => {
  const context = canvas.getContext('2d')
  context.globalCompositeOperation = 'source-over'
  context.fillStyle = checkerboardPattern
  context.fillRect(0, 0, canvas.width, canvas.height)
}

const getTilesetColumns = () => {
  const scaledTileWidth = mappoState.tileset.tileWidth * getScale()
  return ~~(tilesetCanvasContainer.offsetWidth / scaledTileWidth)
}

const getTilesetRows = () => {
  const tilesetColumns = getTilesetColumns()
  const roundedUpRows = ~~((mappoState.tileset.numTiles + (tilesetColumns - 1)) / tilesetColumns)
  return roundedUpRows
}

const renderTileset = () => {
  const tilesetColumns = getTilesetColumns()

  for (let tileIndex = 0; tileIndex < mappoState.tileset.numTiles; tileIndex++) {
    const tileX = tileIndex % tilesetColumns
    const tileY = ~~(tileIndex / tilesetColumns)

    renderTile({
      context: tilesetContext,
      tileIndex,
      x: tileX * mappoState.tileset.tileWidth,
      y: tileY * mappoState.tileset.tileHeight,
    })
  }
}

const tick = () => {
  clearCanvas(canvas)
  clearCanvas(tilesetCanvas)
  clearCanvas(tilesetSelectedTileCanvas)
  clearCanvas(tilesetHoveringTileCanvas)

  if (!mappoState.isLoading) {
    mappoState.map.mapLayerOrder.forEach(layerIndex => {
      const tileLayer = mappoState.map.tileLayers[layerIndex]
      if (!tileLayer.isHidden) {
        renderLayer(
          tileLayer,
          mappoState.cameraX * tileLayer.parallax.x,
          mappoState.cameraY * tileLayer.parallax.y,
          layerIndex > 0 // transparent
        )
      }
    })

    if (hoverCanvasCoord) {
      renderTileHighlightInvertedOutline({
        context,
        x: hoverCanvasCoord.x - ((~~mappoState.cameraX + hoverCanvasCoord.x) % mappoState.tileset.tileWidth),
        y: hoverCanvasCoord.y - ((~~mappoState.cameraY + hoverCanvasCoord.y) % mappoState.tileset.tileHeight),
        width: mappoState.tileset.tileWidth,
        height: mappoState.tileset.tileHeight,
      })
    }

    renderTileset()
    renderTileHighlightInvertedSolid({
      context: tilesetContext,
      x: mappoState.tilesetHoverTileX * mappoState.tileset.tileWidth,
      y: mappoState.tilesetHoverTileY * mappoState.tileset.tileHeight,
      width: mappoState.tileset.tileWidth,
      height: mappoState.tileset.tileHeight,
    })
    renderTileHighlightColorOutline({
      context: tilesetContext,
      x: mappoState.tilesetSelectedTileX * mappoState.tileset.tileWidth,
      y: mappoState.tilesetSelectedTileY * mappoState.tileset.tileHeight,
      color: 'white',
      width: mappoState.tileset.tileWidth,
      height: mappoState.tileset.tileHeight,
    })

    renderTile({
      context: tilesetSelectedTileContext,
      tileIndex: mappoState.tilesetSelectedIndex,
      x: 0,
      y: 0,
    })
    renderTile({
      context: tilesetHoveringTileContext,
      tileIndex: mappoState.tilesetHoverIndex,
      x: 0,
      y: 0,
    })
    tilesetSelectedTileIndex.innerText = mappoState.tilesetSelectedIndex
    tilesetHoveringTileIndex.innerText = mappoState.tilesetHoverIndex

    mappoState.cameraMoveX = 0
    mappoState.cameraMoveY = 0;
    (keyboard.isPressed(keyboard.KEYCODE_UP) || autoScrollY < 0) && (mappoState.cameraMoveY = -mappoState.cameraScrollAmount);
    (keyboard.isPressed(keyboard.KEYCODE_DOWN) || autoScrollY > 0) && (mappoState.cameraMoveY = +mappoState.cameraScrollAmount);
    (keyboard.isPressed(keyboard.KEYCODE_LEFT) || autoScrollX < 0) && (mappoState.cameraMoveX = -mappoState.cameraScrollAmount);
    (keyboard.isPressed(keyboard.KEYCODE_RIGHT) || autoScrollX > 0) && (mappoState.cameraMoveX = +mappoState.cameraScrollAmount);
    moveCamera(mappoState.cameraMoveX, mappoState.cameraMoveY)

    // map zooming
    if (keyboard.isPressed('ctrlKey')) {
      const prevScaleIndex = mappoState.scaleIndex
      if (keyboard.isPressed(keyboard.KEYCODE_PLUS)) {
        keyboard.release(keyboard.KEYCODE_PLUS)
        mappoState.scaleIndex++
      }
      if (keyboard.isPressed(keyboard.KEYCODE_MINUS)) {
        keyboard.release(keyboard.KEYCODE_MINUS)
        mappoState.scaleIndex--
      }
      if (keyboard.isPressed(keyboard.KEYCODE_0)) {
        keyboard.release(keyboard.KEYCODE_0)
        mappoState.scaleIndex = DEFAULT_SCALE_INDEX
      }
      mappoState.scaleIndex = clamp(mappoState.scaleIndex, 0, viewportScales.length - 1)
      // TODO(chuck): redux-ify?
      if (prevScaleIndex !== mappoState.scaleIndex) {
        resizeCanvas()
      }
    }
  }

  window.requestAnimationFrame(tick)
}

const resizeCanvas = () => {
  canvas.width = ~~((middlePanel.offsetWidth + (getScale() - 1)) / getScale())
  canvas.height = ~~((middlePanel.offsetHeight + (getScale() - 1)) / getScale())
  canvas.style.width = middlePanel.offsetWidth + 'px'
  canvas.style.height = middlePanel.offsetHeight + 'px'

  if (!mappoState.isLoading) {
    tilesetCanvas.width = getTilesetColumns() * mappoState.tileset.tileWidth
    tilesetCanvas.height = getTilesetRows() * mappoState.tileset.tileHeight
    tilesetCanvas.style.width = (tilesetCanvas.width * getScale()) + 'px'
    tilesetCanvas.style.height = (tilesetCanvas.height * getScale()) + 'px'
  }
}

window.addEventListener('resize', resizeCanvas)
resizeCanvas()

tick()

