"use strict"

const asset = require(`./asset`)
const colorDepth = require(`./converter/colorDepth`)
const clamp = require(`lodash/clamp`)
const cloneDeep = require(`lodash/clonedeep`)
const glob = require(`glob`)
const createMappoSession = require(`./createMappoSession`)
const createMappoMap = require(`./createMappoMap`)
const createMappoTileset = require(`./createMappoTileset`)
const detectFormat = require(`./detectFormat`)
const path = require(`path`)
const fs = require(`fs`)
const setupKeyboard = require(`./setupKeyboard`)
const renderTileHighlightInvertedOutline = require(`./renderTileHighlightInvertedOutline`)
const renderTileHighlightInvertedSolid = require(`./renderTileHighlightInvertedSolid`)
const renderTileHighlightColorOutline = require(`./renderTileHighlightColorOutline`)
const renderTile = require(`./renderTile`)
const renderLayer = require(`./renderLayer`)
const renderTileset = require(`./renderTileset`)
const createCheckerboardPattern = require(`./createCheckerboardPattern`)
const calcAutoScroll = require(`./calcAutoScroll`)
const clearCanvas = require(`./clearCanvas`)
const loadMappoMap = require(`./loadMappoMap`)
const createStore = require(`./createStore`)
const mappoState = require(`./mappoState`)

// DOM REFERENCES
const pageTitle = document.querySelector(`title`)
const mapList = document.querySelector(`.map-list`)
const layerList = document.querySelector(`.layer-list`)
const canvas = document.querySelector(`.mappo-viewport`)
const context = canvas.getContext(`2d`)
const tilesetCanvasContainer = document.querySelector(`.tileset-canvas-container`)
const tilesetCanvas = document.querySelector(`.tileset-canvas`)
const tilesetContext = tilesetCanvas.getContext(`2d`)
const tilesetSelectedTileCanvas = document.querySelector(`.tileset-selected-tile-canvas`)
const tilesetSelectedTileContext = tilesetSelectedTileCanvas.getContext(`2d`)
const tilesetSelectedTileIndex = document.querySelector(`.tileset-selected-tile-index`)
const tilesetHoveringTileCanvas = document.querySelector(`.tileset-hovering-tile-canvas`)
const tilesetHoveringTileContext = tilesetHoveringTileCanvas.getContext(`2d`)
const tilesetHoveringTileIndex = document.querySelector(`.tileset-hovering-tile-index`)
const middlePanel = document.querySelector(`.middle-panel`)

const checkerboardPattern = createCheckerboardPattern({document})

const store = createStore(mappoState)

const launchFolder = `data` // TODO(chuck): temp hack for windows. empty string dunna work
console.log(`launchFolder`, launchFolder)
const mapGlob = `**/*.map`
const mapFilenames = glob.sync(mapGlob, {nocase: true})
const mappoSession = createMappoSession({
  fileSystem: {
    files: mapFilenames
  },
  launchFolder
})

const viewportScales = [0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const DEFAULT_SCALE_INDEX = 4
const defaultGlobalMappoState = {
  scaleIndex: DEFAULT_SCALE_INDEX,
  isLoading: true,
  mapLayerOrder: null,
  mapLayerSelected: null,
  mapLayerTileHighlightCoord: null,
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
let globalMappoState = cloneDeep(defaultGlobalMappoState)

const getScale = () => viewportScales[globalMappoState.scaleIndex]

mappoSession.getMapFilenames().forEach(mapFilename => {
  const li = document.createElement(`li`)
  li.setAttribute(`title`, mapFilename)
  li.innerText = mapFilename
  // TODO(chuck): temp hack for windows. figure out better launchFolder shenanigans
  li.addEventListener(`click`, event => {
    globalMappoState = cloneDeep(defaultGlobalMappoState)
    globalMappoState.isLoading = true

    const map = loadMappoMap({context, mapFilename: `data/` + mapFilename})
    store.dispatch({type: `SET_MAP`, map})

    globalMappoState.mapLayerSelected = store.getState().map.tileLayers[store.getState().map.mapLayerOrder[0]]
    refreshMapLayerList()

    tilesetSelectedTileCanvas.width = store.getState().map.tileset.tileWidth
    tilesetSelectedTileCanvas.height = store.getState().map.tileset.tileHeight
    tilesetHoveringTileCanvas.width = store.getState().map.tileset.tileWidth
    tilesetHoveringTileCanvas.height = store.getState().map.tileset.tileHeight

    // TODO(chuck): shorten this crazy chain
    store.getState().map.tileset.imageBitmapPromise.then(() => {
      globalMappoState.isLoading = false
      resizeCanvas()
    })

    pageTitle.innerText = `Mappo - ` + mapFilename
  })
  mapList.appendChild(li)
})

const refreshMapLayerList = () => {
  layerList.innerHTML = ``
  store.getState().map.tileLayers.forEach((layer, index) => {
    const li = document.createElement(`li`)
    li.setAttribute(`title`, layer.description)
    li.innerText = layer.description
    li.classList.add(`layer-list-item`)
    if (globalMappoState.mapLayerSelected === layer) {
      li.classList.add(`selected`)
    }
    li.addEventListener(`click`, event => {
      // TODO(chuck): use a proper element?
      if (event.offsetX < 35) {
        li.classList.toggle(`is-layer-hidden`)
        layer.isHidden = !layer.isHidden
      }
      globalMappoState.mapLayerSelected = layer
      const layerListItems = document.querySelectorAll(`.layer-list .layer-list-item`)
      layerListItems.forEach(layerListItem => {
        layerListItem.classList.remove(`selected`)
      })
      li.classList.add(`selected`)
    })
    layerList.appendChild(li)
  })
}

const keyboard = setupKeyboard({
  addEventListener: document.addEventListener,
  keyPressed: globalMappoState.keyPressed,
})

middlePanel.addEventListener(`mousedown`, event => {
  globalMappoState.mouseDown = true
})

middlePanel.addEventListener(`mousemove`, event => {
  if (globalMappoState.isLoading) {
    return
  }

  const scale = getScale()
  if (globalMappoState.mouseDown) {
    if (keyboard.isPressed(`altKey`)) {
      moveCamera(
        -event.movementX / scale,
        -event.movementY / scale
      )
    }
  }

  globalMappoState.autoScroll = {}
  if (globalMappoState.mouseInViewport) {
    globalMappoState.autoScroll = calcAutoScroll({
      scale,
      threshold: (store.getState().map.tileset.tileWidth + store.getState().map.tileset.tileHeight) / 2,
      cursorX: event.offsetX,
      cursorY: event.offsetY,
      viewportWidth: middlePanel.offsetWidth,
      viewportHeight: middlePanel.offsetHeight,
    })
  }

  const mapLayerSelected = globalMappoState.mapLayerSelected
  if (mapLayerSelected) {
    const tileWidth = store.getState().map.tileset.tileWidth
    const tileHeight = store.getState().map.tileset.tileHeight
    const scaleX = ~~(event.offsetX / scale)
    const scaleY = ~~(event.offsetY / scale)
    const parallaxX = ~~(globalMappoState.camera.x * mapLayerSelected.parallax.x)
    const parallaxY = ~~(globalMappoState.camera.y * mapLayerSelected.parallax.y)
    const x = scaleX - ((parallaxX + scaleX) % tileWidth)
    const y = scaleY - ((parallaxY + scaleY) % tileHeight)

    globalMappoState.mapLayerTileHighlightCoord = {x, y}
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

tilesetCanvasContainer.addEventListener(`mousemove`, event => {
  if (globalMappoState.isLoading) {
    return
  }

  store.getState().map.tilesetTileHovering = getTileCoordAndIndex({
    tileset: store.getState().map.tileset,
    containerWidth: tilesetCanvasContainer.offsetWidth,
    pixelX: event.offsetX,
    pixelY: event.offsetY,
  })
})

tilesetCanvasContainer.addEventListener(`click`, event => {
  if (globalMappoState.isLoading) {
    return
  }

  globalMappoState.tilesetTileSelected = getTileCoordAndIndex({
    tileset: store.getState().map.tileset,
    containerWidth: tilesetCanvasContainer.offsetWidth,
    pixelX: event.offsetX,
    pixelY: event.offsetY,
  })
})

middlePanel.addEventListener(`mouseup`, event => {
  globalMappoState.mouseDown = false
})

middlePanel.addEventListener(`mouseenter`, event => {
  globalMappoState.mouseInViewport = true
})

middlePanel.addEventListener(`mouseout`, event => {
  globalMappoState.mouseInViewport = false
  globalMappoState.mouseDown = false
  globalMappoState.camera.move = {x: 0, y: 0}
  globalMappoState.autoScroll = {}
  globalMappoState.mapLayerTileHighlightCoord = null
})

const moveCamera = (moveX, moveY) => {
  globalMappoState.camera.x = clamp(globalMappoState.camera.x + moveX, 0, (store.getState().map.tileLayers[0].width * store.getState().map.tileset.tileWidth) - canvas.width)
  globalMappoState.camera.y = clamp(globalMappoState.camera.y + moveY, 0, (store.getState().map.tileLayers[0].height * store.getState().map.tileset.tileHeight) - canvas.height)
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

  if (!globalMappoState.isLoading) {
    const tileset = store.getState().map.tileset
    const tileWidth = tileset.tileWidth
    const tileHeight = tileset.tileHeight
    const containerWidth = tilesetCanvasContainer.offsetWidth

    store.getState().map.mapLayerOrder.forEach(layerIndex => {
      const tileLayer = store.getState().map.tileLayers[layerIndex]
      if (!tileLayer.isHidden) {
        renderLayer({
          context,
          canvas,
          tileset,
          layer: tileLayer,
          x: globalMappoState.camera.x * tileLayer.parallax.x,
          y: globalMappoState.camera.y * tileLayer.parallax.y,
          transparent: layerIndex > 0,
        })
      }
    })

    if (globalMappoState.mapLayerTileHighlightCoord) {
      renderTileHighlightInvertedOutline({
        context,
        x: globalMappoState.mapLayerTileHighlightCoord.x,
        y: globalMappoState.mapLayerTileHighlightCoord.y,
        width: tileWidth,
        height: tileHeight,
      })
    }

    renderTileset({
      context: tilesetContext,
      tileset: store.getState().map.tileset,
      tilesetColumns: getTilesetColumns({tileset, containerWidth})
    })

    if (store.getState().map.tilesetTileHovering) {
      renderTileHighlightInvertedSolid({
        context: tilesetContext,
        x: store.getState().map.tilesetTileHovering.tileX * tileWidth,
        y: store.getState().map.tilesetTileHovering.tileY * tileHeight,
        width: tileWidth,
        height: tileHeight,
      })
      renderTile({
        context: tilesetHoveringTileContext,
        tileset: store.getState().map.tileset,
        tileIndex: store.getState().map.tilesetTileHovering.tileIndex,
        x: 0,
        y: 0,
      })

      tilesetHoveringTileIndex.innerText = store.getState().map.tilesetTileHovering.tileIndex
    }

    if (globalMappoState.tilesetTileSelected) {
      renderTileHighlightColorOutline({
        context: tilesetContext,
        x: globalMappoState.tilesetTileSelected.tileX * tileWidth,
        y: globalMappoState.tilesetTileSelected.tileY * tileHeight,
        color: `white`,
        width: tileWidth,
        height: tileHeight,
      })
      renderTile({
        context: tilesetSelectedTileContext,
        tileset: store.getState().map.tileset,
        tileIndex: globalMappoState.tilesetTileSelected.tileIndex,
        x: 0,
        y: 0,
      })

      tilesetSelectedTileIndex.innerText = globalMappoState.tilesetTileSelected.tileIndex
    }

    globalMappoState.camera.move = {x: 0, y: 0}
    const autoScroll = globalMappoState.autoScroll
    if (autoScroll) {
      (keyboard.isPressed(keyboard.KEYCODE_UP) || autoScroll.x < 0) && (globalMappoState.camera.move.y = -globalMappoState.cameraScrollAmount);
      (keyboard.isPressed(keyboard.KEYCODE_DOWN) || autoScroll.y > 0) && (globalMappoState.camera.move.y = +globalMappoState.cameraScrollAmount);
      (keyboard.isPressed(keyboard.KEYCODE_LEFT) || autoScroll.x < 0) && (globalMappoState.camera.move.x = -globalMappoState.cameraScrollAmount);
      (keyboard.isPressed(keyboard.KEYCODE_RIGHT) || autoScroll.x > 0) && (globalMappoState.camera.move.x = +globalMappoState.cameraScrollAmount);
      moveCamera(globalMappoState.camera.move.x, globalMappoState.camera.move.y)
    }

    // map zooming
    if (keyboard.isPressed(`ctrlKey`)) {
      const prevScaleIndex = globalMappoState.scaleIndex
      if (keyboard.isPressed(keyboard.KEYCODE_PLUS)) {
        keyboard.release(keyboard.KEYCODE_PLUS)
        globalMappoState.scaleIndex++
      }
      if (keyboard.isPressed(keyboard.KEYCODE_MINUS)) {
        keyboard.release(keyboard.KEYCODE_MINUS)
        globalMappoState.scaleIndex--
      }
      if (keyboard.isPressed(keyboard.KEYCODE_0)) {
        keyboard.release(keyboard.KEYCODE_0)
        globalMappoState.scaleIndex = DEFAULT_SCALE_INDEX
      }
      globalMappoState.scaleIndex = clamp(globalMappoState.scaleIndex, 0, viewportScales.length - 1)
      // TODO(chuck): redux-ify?
      if (prevScaleIndex !== globalMappoState.scaleIndex) {
        resizeCanvas()
      }
    }
  }

  window.requestAnimationFrame(tick)
}

const resizeCanvas = () => {
  canvas.width = ~~((middlePanel.offsetWidth + (getScale() - 1)) / getScale())
  canvas.height = ~~((middlePanel.offsetHeight + (getScale() - 1)) / getScale())
  canvas.style.width = middlePanel.offsetWidth + `px`
  canvas.style.height = middlePanel.offsetHeight + `px`

  if (!globalMappoState.isLoading) {
    const containerWidth = tilesetCanvasContainer.offsetWidth
    const tileset = store.getState().map.tileset
    tilesetCanvas.width = getTilesetColumns({tileset, containerWidth}) * tileset.tileWidth
    tilesetCanvas.height = getTilesetRows({tileset, containerWidth}) * tileset.tileHeight
    tilesetCanvas.style.width = (tilesetCanvas.width * getScale()) + `px`
    tilesetCanvas.style.height = (tilesetCanvas.height * getScale()) + `px`
  }
}

window.addEventListener(`resize`, resizeCanvas)
resizeCanvas()

tick()

