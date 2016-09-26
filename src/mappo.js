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
const renderTile = require('./renderTile')
const renderLayer = require('./renderLayer')
const renderTileset = require('./renderTileset')
const createCheckerboardPattern = require('./createCheckerboardPattern')
const calcAutoScroll = require('./calcAutoScroll')
const clearCanvas = require('./clearCanvas')
const loadMappoMap = require('./loadMappoMap')

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

const checkerboardPattern = createCheckerboardPattern({document})

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
  tilesetTileHovering: null,
  tilesetTileSelected: null,
  camera: {
    x: 0,
    y: 0,
    move: {
      x: 0,
      y: 0,
    },
  },
  cameraScrollAmount: 1,
  keyPressed: {},
  mouseDown: false,
  mouseInViewport: false,
  autoScroll: {},
}
let mappoState = Object.assign({}, defaultMappoState)

const getScale = () => viewportScales[mappoState.scaleIndex]

mappoSession.getMapFilenames().forEach(mapFilename => {
  const li = document.createElement('li')
  li.setAttribute('title', mapFilename)
  li.innerText = mapFilename
  // TODO(chuck): temp hack for windows. figure out better launchFolder shenanigans
  li.addEventListener('click', event => {
    mappoState = Object.assign({}, defaultMappoState)
    mappoState.isLoading = true

    mappoState.map = loadMappoMap({context, mapFilename: 'data/' + mapFilename})

    mappoState.mapLayerSelected = mappoState.map.tileLayers[mappoState.map.mapLayerOrder[0]]
    refreshMapLayerList()

    tilesetSelectedTileCanvas.width = mappoState.map.tileset.tileWidth
    tilesetSelectedTileCanvas.height = mappoState.map.tileset.tileHeight
    tilesetHoveringTileCanvas.width = mappoState.map.tileset.tileWidth
    tilesetHoveringTileCanvas.height = mappoState.map.tileset.tileHeight

    // TODO(chuck): shorten this crazy chain
    mappoState.map.tileset.imageBitmapPromise.then(() => {
      mappoState.isLoading = false
      resizeCanvas()
    })

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

const keyboard = setupKeyboard({
  addEventListener: document.addEventListener,
  keyPressed: mappoState.keyPressed,
})

middlePanel.addEventListener('mousedown', event => {
  mappoState.mouseDown = true
})

let mapLayerTileHighlightCoord = null
middlePanel.addEventListener('mousemove', event => {
  if (mappoState.isLoading) {
    return
  }

  const scale = getScale()
  if (mappoState.mouseDown) {
    moveCamera(
      -event.movementX / scale,
      -event.movementY / scale
    )
  }

  mappoState.autoScroll = {}
  if (mappoState.mouseInViewport) {
    mappoState.autoScroll = calcAutoScroll({
      scale,
      threshold: (mappoState.map.tileset.tileWidth + mappoState.map.tileset.tileHeight) / 2,
      cursorX: event.offsetX,
      cursorY: event.offsetY,
      viewportWidth: middlePanel.offsetWidth,
      viewportHeight: middlePanel.offsetHeight,
    })
  }

  const mapLayerSelected = mappoState.mapLayerSelected
  if (mapLayerSelected) {
    const tileWidth = mappoState.map.tileset.tileWidth
    const tileHeight = mappoState.map.tileset.tileHeight
    const scaleX = ~~(event.offsetX / scale)
    const scaleY = ~~(event.offsetY / scale)
    const parallaxX = ~~(mappoState.camera.x * mapLayerSelected.parallax.x)
    const parallaxY = ~~(mappoState.camera.y * mapLayerSelected.parallax.y)
    const x = scaleX - ((parallaxX + scaleX) % tileWidth)
    const y = scaleY - ((parallaxY + scaleY) % tileHeight)

    mapLayerTileHighlightCoord = {x, y}
  }
})

const getTileCoordAndIndex = ({
  tileset,
  containerWidth,
  pixelX,
  pixelY,
}) => {
  const scale = getScale()
  const tilesetColumns = getTilesetColumns({tileset, containerWidth})
  const tileX = ~~(pixelX / (tileset.tileWidth * scale))
  const tileY = ~~(pixelY / (tileset.tileHeight * scale))
  const tileIndex = (tileY * tilesetColumns) + tileX

  return {
    tileX,
    tileY,
    tileIndex,
  }
}

tilesetCanvasContainer.addEventListener('mousemove', event => {
  if (mappoState.isLoading) {
    return
  }

  mappoState.map.tilesetTileHovering = getTileCoordAndIndex({
    tileset: mappoState.map.tileset,
    containerWidth: tilesetCanvasContainer.offsetWidth,
    pixelX: event.offsetX,
    pixelY: event.offsetY,
  })
})

tilesetCanvasContainer.addEventListener('click', event => {
  if (mappoState.isLoading) {
    return
  }

  mappoState.map.tilesetTileSelected = getTileCoordAndIndex({
    tileset: mappoState.map.tileset,
    containerWidth: tilesetCanvasContainer.offsetWidth,
    pixelX: event.offsetX,
    pixelY: event.offsetY,
  })
})

middlePanel.addEventListener('mouseup', event => {
  mappoState.mouseDown = false
})

middlePanel.addEventListener('mouseenter', event => {
  mappoState.mouseInViewport = true
})

middlePanel.addEventListener('mouseout', event => {
  mappoState.mouseInViewport = false
  mappoState.camera.move = {x: 0, y: 0}
  mappoState.autoScroll = {}
  mapLayerTileHighlightCoord = null
})

const moveCamera = (moveX, moveY) => {
  mappoState.camera.x = clamp(mappoState.camera.x + moveX, 0, (mappoState.map.tileLayers[0].width * mappoState.map.tileset.tileWidth) - canvas.width)
  mappoState.camera.y = clamp(mappoState.camera.y + moveY, 0, (mappoState.map.tileLayers[0].height * mappoState.map.tileset.tileHeight) - canvas.height)
}

const getTilesetColumns = ({tileset, containerWidth}) => {
  const scaledTileWidth = tileset.tileWidth * getScale()
  return ~~(containerWidth / scaledTileWidth)
}

const getTilesetRows = ({tileset, containerWidth}) => {
  const tilesetColumns = getTilesetColumns({tileset, containerWidth})
  const roundedUpRows = ~~((tileset.numTiles + (tilesetColumns - 1)) / tilesetColumns)
  return roundedUpRows
}

const tick = () => {
  clearCanvas({canvas, pattern: checkerboardPattern})
  clearCanvas({canvas: tilesetCanvas, pattern: checkerboardPattern})
  clearCanvas({canvas: tilesetSelectedTileCanvas, pattern: checkerboardPattern})
  clearCanvas({canvas: tilesetHoveringTileCanvas, pattern: checkerboardPattern})

  if (!mappoState.isLoading) {
    const tileset = mappoState.map.tileset
    const tileWidth = tileset.tileWidth
    const tileHeight = tileset.tileHeight
    const containerWidth = tilesetCanvasContainer.offsetWidth

    mappoState.map.mapLayerOrder.forEach(layerIndex => {
      const tileLayer = mappoState.map.tileLayers[layerIndex]
      if (!tileLayer.isHidden) {
        renderLayer({
          tileset,
          layer: tileLayer,
          x: mappoState.camera.x * tileLayer.parallax.x,
          y: mappoState.camera.y * tileLayer.parallax.y,
          transparent: layerIndex > 0,
        })
      }
    })

    if (mapLayerTileHighlightCoord) {
      renderTileHighlightInvertedOutline({
        context,
        x: mapLayerTileHighlightCoord.x,
        y: mapLayerTileHighlightCoord.y,
        width: tileWidth,
        height: tileHeight,
      })
    }

    renderTileset({
      context: tilesetContext,
      tileset: mappoState.map.tileset,
      tilesetColumns: getTilesetColumns({tileset, containerWidth})
    })

    if (mappoState.map.tilesetTileHovering) {
      renderTileHighlightInvertedSolid({
        context: tilesetContext,
        x: mappoState.map.tilesetTileHovering.tileX * tileWidth,
        y: mappoState.map.tilesetTileHovering.tileY * tileHeight,
        width: tileWidth,
        height: tileHeight,
      })
      renderTile({
        context: tilesetHoveringTileContext,
        tileset: mappoState.map.tileset,
        tileIndex: mappoState.map.tilesetTileHovering.tileIndex,
        x: 0,
        y: 0,
      })

      tilesetHoveringTileIndex.innerText = mappoState.map.tilesetTileHovering.tileIndex
    }

    if (mappoState.map.tilesetTileSelected) {
      renderTileHighlightColorOutline({
        context: tilesetContext,
        x: mappoState.map.tilesetTileSelected.tileX * tileWidth,
        y: mappoState.map.tilesetTileSelected.tileY * tileHeight,
        color: 'white',
        width: tileWidth,
        height: tileHeight,
      })
      renderTile({
        context: tilesetSelectedTileContext,
        tileset: mappoState.map.tileset,
        tileIndex: mappoState.map.tilesetTileSelected.tileIndex,
        x: 0,
        y: 0,
      })

      tilesetSelectedTileIndex.innerText = mappoState.map.tilesetTileSelected.tileIndex
    }

    mappoState.camera.move = {x: 0, y: 0}
    const autoScroll = mappoState.autoScroll
    if (autoScroll) {
      (keyboard.isPressed(keyboard.KEYCODE_UP) || autoScroll.x < 0) && (mappoState.camera.move.y = -mappoState.cameraScrollAmount);
      (keyboard.isPressed(keyboard.KEYCODE_DOWN) || autoScroll.y > 0) && (mappoState.camera.move.y = +mappoState.cameraScrollAmount);
      (keyboard.isPressed(keyboard.KEYCODE_LEFT) || autoScroll.x < 0) && (mappoState.camera.move.x = -mappoState.cameraScrollAmount);
      (keyboard.isPressed(keyboard.KEYCODE_RIGHT) || autoScroll.x > 0) && (mappoState.camera.move.x = +mappoState.cameraScrollAmount);
      moveCamera(mappoState.camera.move.x, mappoState.camera.move.y)
    }

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
    const containerWidth = tilesetCanvasContainer.offsetWidth
    const tileset = mappoState.map.tileset
    tilesetCanvas.width = getTilesetColumns({tileset, containerWidth}) * tileset.tileWidth
    tilesetCanvas.height = getTilesetRows({tileset, containerWidth}) * tileset.tileHeight
    tilesetCanvas.style.width = (tilesetCanvas.width * getScale()) + 'px'
    tilesetCanvas.style.height = (tilesetCanvas.height * getScale()) + 'px'
  }
}

window.addEventListener('resize', resizeCanvas)
resizeCanvas()

tick()

