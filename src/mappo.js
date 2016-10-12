"use strict"

const {ipcRenderer} = require(`electron`)
const {createStore, applyMiddleware} = require(`redux`)
const thunk = require(`redux-thunk`).default
const reduxWatch = require(`redux-watch`)
const {List, Map, fromJS} = require(`immutable`)
const startReact = require(`./react/startReact.js.compiled`)

const asset = require(`./asset`)
const colorDepth = require(`./converter/colorDepth`)
const clamp = require(`lodash/clamp`)
const debounce = require(`lodash/debounce`)
const cloneDeep = require(`lodash/clonedeep`)
const glob = require(`glob`)
const createMappoSession = require(`./createMappoSession`)
const detectFormat = require(`./detectFormat`)
const path = require(`path`)
const fs = require(`fs`)
const setupKeyboard = require(`./setupKeyboard`)
const convertRaw32bitDataToImageBitmap = require(`./convertRaw32bitDataToImageBitmap`)
const renderTileHighlightInvertedOutline = require(`./renderTileHighlightInvertedOutline`)
const renderTileHighlightInvertedSolid = require(`./renderTileHighlightInvertedSolid`)
const renderTileHighlightColorOutline = require(`./renderTileHighlightColorOutline`)
const renderTile = require(`./renderTile`)
const renderLayer = require(`./renderLayer`)
const renderMap = require(`./renderMap`)
const renderTileset = require(`./renderTileset`)
const createCheckerboardPattern = require(`./createCheckerboardPattern`)
const clearCanvas = require(`./clearCanvas`)
const loadMappoConfig = require(`./loadMappoConfig`)
const saveMappoConfig = require(`./saveMappoConfig`)
const mappoApp = require(`./reducers/mappoApp`)
const ZOOM_LEVELS = require(`./reducers/zoomLevels`)
const DEFAULT_ZOOM_LEVEL = require(`./reducers/defaultZoomLevel`)
const {
  highlightMapTile,
  hoverTilesetTile,
  loadMap,
  moveCamera,
  plotTile,
  redo,
  resetLayerVisibilities,
  saveRecentMapFilename,
  selectLayer,
  selectTilesetTile,
  setMap,
  setMapLoading,
  setWindowPosition,
  setWindowSize,
  setZoomLevel,
  toggleLayerVisibility,
  undo,
} = require(`./actions/index`)
const rebuildTilesetImageBitmap = require(`./rebuildTilesetImageBitmap`)
const roundedUpUnits = require(`./roundedUpUnits`)

// DOM REFERENCES
const mappoEl = document.getElementById(`mappo`)
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
const undoButton = document.querySelector(`.undo`)
const redoButton = document.querySelector(`.redo`)
const mapListContainer = document.querySelector(`.map-list-container`)

const checkerboardPattern = createCheckerboardPattern({document})

let tilesetImageBitmap

const config = loadMappoConfig()

let plainMap
let session = {}
if (config.recentMapFilename) {
  if (config.recentMapFilename.length > 0) {
    session = JSON.parse(fs.readFileSync(config.recentMapFilename))
    console.log(`loaded session from`, config.recentMapFilename)

    if (session.ui) {
      if (session.ui.camera) {
        session.ui.camera = Map(session.ui.camera)
      }
      if (session.ui.layerHidden) {
        session.ui.layerHidden = List(session.ui.layerHidden)
      }
    }

    if (session.plots) {
      session.plots = fromJS(session.plots)
    }
    plainMap = session.map
    if (session.map) {
      session.map = fromJS(session.map)
    }
  }
}

const store = createStore(
  mappoApp,
  {config, session},
  applyMiddleware(thunk)
)

store.dispatch(setMapLoading(true))

const setTilesetImageBitmap = tilesetImage => {
  tilesetImageBitmap = tilesetImage

  const tileset = store.getState().session.map.get(`tileset`)
  tilesetSelectedTileCanvas.width = tileset.get(`tileWidth`)
  tilesetSelectedTileCanvas.height = tileset.get(`tileHeight`)
  tilesetHoveringTileCanvas.width = tileset.get(`tileWidth`)
  tilesetHoveringTileCanvas.height = tileset.get(`tileHeight`)

  store.dispatch(setMapLoading(false))
  resizeCanvas()
}

// TODO(chuck): any way for this to happen as part of initial hydration?
if (plainMap) {
  rebuildTilesetImageBitmap(
    plainMap.tileset
  ).then(setTilesetImageBitmap)
}

if (store.getState().session.ui.zoomLevel === undefined) {
  store.dispatch(setZoomLevel(DEFAULT_ZOOM_LEVEL))
}

let maxMapWidth = 0
let maxMapHeight = 0

const recalcMaxMapSize = () => {
  const state = store.getState()
  if (!state.session.map) {
    return
  }
  const map = state.session.map

  maxMapWidth = 0
  maxMapHeight = 0
  map.get(`tileLayers`).forEach(layer => {
    if (maxMapWidth < layer.get(`width`)) {
      maxMapWidth = layer.get(`width`)
    }
    if (maxMapHeight < layer.get(`height`)) {
      maxMapHeight = layer.get(`height`)
    }
  })
}

recalcMaxMapSize()

const moveCameraRelatively = (moveX, moveY) => {
  const state = store.getState()
  const map = state.session.map
  const mapWidth = maxMapWidth
  const mapHeight = maxMapHeight
  const tileWidth = map.getIn([`tileset`, `tileWidth`])
  const tileHeight = map.getIn([`tileset`, `tileHeight`])
  const maxX = mapWidth * tileWidth - canvas.width
  const maxY = mapHeight * tileHeight - canvas.height
  const newX = clamp(state.session.ui.camera.get(`x`) + moveX, 0, maxX)
  const newY = clamp(state.session.ui.camera.get(`y`) + moveY, 0, maxY)

  if (newX !== state.session.ui.camera.get(`x`) || newY !== state.session.ui.camera.get(`y`)) {
    store.dispatch(moveCamera({x: newX, y: newY}))
  }
}

let lastSaveTimestamp = new Date()
const launchFolder = `data` // TODO(chuck): temp hack for windows. empty string dunna work
console.log(`launchFolder`, launchFolder)
const mapGlob = `**/*`
const mapFilenames = glob.sync(mapGlob, {nocase: true})
const mappoSession = createMappoSession({
  fileSystem: {
    files: mapFilenames
  },
  launchFolder
})

const defaultGlobalMappoState = {
  mapLayerOrder: null,
  tileset: null,
  tilesetTileHovering: null,
  keyPressed: {},
  mouseDown: false,
  mouseInViewport: false,
}
let globalMappoState = cloneDeep(defaultGlobalMappoState)

const getScale = () => ZOOM_LEVELS[store.getState().session.ui.zoomLevel]

const clickMapFilename = mapFilename => {
  console.log(`clickMapFilename`, mapFilename)

  globalMappoState = cloneDeep(defaultGlobalMappoState)
  pageTitle.innerText = `mappo - ` + mapFilename

  store.dispatch(setMapLoading(true))
  store.dispatch(
    loadMap({context, mapFilename: `data/` + mapFilename})
  ).then(setTilesetImageBitmap)
}

startReact({
  mapFilenames: mappoSession.getMapFilenames(),
  mapListContainer,
  clickMapFilename,
})

const refreshMapLayerList = () => {
  const state = store.getState()
  if (!state.session.map) {
    return
  }
  layerList.innerHTML = ``
  state.session.map.get(`tileLayers`).forEach((layer, index) => {
    const li = document.createElement(`li`)
    li.setAttribute(`title`, layer.get(`description`))
    li.innerText = layer.get(`description`)
    li.classList.add(`layer-list-item`)
    if (state.session.ui.layerHidden && state.session.ui.layerHidden.get(index)) {
      li.classList.add(`is-layer-hidden`)
    }
    if (state.session.ui.selectedTileLayerIndex === index) {
      li.classList.add(`selected`)
    }
    li.addEventListener(`click`, event => {
      // TODO(chuck): use a proper element?
      if (event.offsetX < 35) {
        store.dispatch(toggleLayerVisibility(index))
      } else {
        store.dispatch(selectLayer(index))
      }
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

  if (!keyboard.isPressed(`altKey`)) {
    plot(event)
  }
})

middlePanel.addEventListener(`click`, event => {
  if (store.getState().session.ui.isMapLoading) {
    return
  }
})

const getPlotCoord = ({viewportX, viewportY}) => {
  const scale = getScale()
  const state = store.getState()
  const map = state.session.map
  const tileWidth = map.getIn([`tileset`, `tileWidth`])
  const tileHeight = map.getIn([`tileset`, `tileHeight`])
  const viewportScaleX = ~~(viewportX / scale)
  const viewportScaleY = ~~(viewportY / scale)
  const layer = map.getIn([`tileLayers`, `${state.session.ui.selectedTileLayerIndex}`])
  const parallaxX = ~~(state.session.ui.camera.get(`x`) * layer.getIn([`parallax`, `x`]))
  const parallaxY = ~~(state.session.ui.camera.get(`y`) * layer.getIn([`parallax`, `y`]))
  const mapX = parallaxX + viewportScaleX
  const mapY = parallaxY + viewportScaleY
  const pixelX = mapX - (mapX % tileWidth)
  const pixelY = mapY - (mapY % tileHeight)
  const tileX = ~~(pixelX / tileWidth)
  const tileY = ~~(pixelY / tileHeight)

  return {tileX, tileY}
}

const plot = (event) => {
  const state = store.getState()
  if (state.session.ui.selectedTilesetTile.index !== -1 && state.session.ui.selectedTileLayerIndex !== -1) {
    const {tileX, tileY} = getPlotCoord({
      viewportX: event.offsetX,
      viewportY: event.offsetY,
    })
    const layer = state.session.map.getIn([`tileLayers`, `${state.session.ui.selectedTileLayerIndex}`])
    if (layer.get(`tileIndexGrid`).get((tileY * layer.get(`width`)) + tileX) === state.session.ui.selectedTilesetTile.index) {
      return
    }
    store.dispatch(plotTile({
      tileLayerIndex: state.session.ui.selectedTileLayerIndex,
      tileLayers: state.session.map.get(`tileLayers`),
      tileIndexToPlot: state.session.ui.selectedTilesetTile.index,
      x: tileX,
      y: tileY,
    }))
  } else {
    console.log(`*warning* no tile selected, not plotting anything...`)
  }
}

middlePanel.addEventListener(`mousemove`, event => {
  if (store.getState().session.ui.isMapLoading) {
    return
  }

  const scale = getScale()
  const state = store.getState()
  const map = state.session.map
  const tileset = map.get(`tileset`)

  if (keyboard.isPressed(`altKey`)) {
    moveCameraRelatively(
      -event.movementX / scale,
      -event.movementY / scale
    )
  } else if (globalMappoState.mouseDown) {
    plot(event)
  }

  if (state.session.ui.selectedTileLayerIndex !== -1) {
    const layer = state.session.map.getIn([`tileLayers`, state.session.ui.selectedTileLayerIndex])
    const tileWidth = tileset.get(`tileWidth`)
    const tileHeight = tileset.get(`tileHeight`)
    const scaleX = event.offsetX / scale
    const scaleY = event.offsetY / scale
    const parallaxX = state.session.ui.camera.get(`x`) * layer.getIn([`parallax`, `x`])
    const parallaxY = state.session.ui.camera.get(`y`) * layer.getIn([`parallax`, `y`])
    const tileX = ~~((parallaxX + scaleX) / tileWidth)
    const tileY = ~~((parallaxY + scaleY) / tileHeight)

    if (tileX !== state.session.ui.highlightedMapTile.x || tileY !== state.session.ui.highlightedMapTile.y) {
      store.dispatch(highlightMapTile({x: tileX, y: tileY}))
    }
  }
})

const getTileCoordAndIndex = ({
  tileset,
  containerWidth,
  pixelX,
  pixelY,
}) => {
  const scale = getScale()
  const tilesetColumns = tileset.get(`tileColumns`)
  const tileX = ~~(pixelX / (tileset.get(`tileWidth`) * scale))
  const tileY = ~~(pixelY / (tileset.get(`tileHeight`) * scale))
  const tileIndex = (tileY * tilesetColumns) + tileX

  return {
    tileX,
    tileY,
    tileIndex,
  }
}

tilesetCanvasContainer.addEventListener(`mousemove`, event => {
  if (store.getState().session.ui.isMapLoading) {
    return
  }

  const info = getTileCoordAndIndex({
    tileset: store.getState().session.map.get(`tileset`),
    containerWidth: tilesetCanvas.width * getScale(),
    pixelX: event.offsetX,
    pixelY: event.offsetY,
  })
  store.dispatch(hoverTilesetTile({x: info.tileX, y: info.tileY, index: info.tileIndex}))
})

tilesetCanvasContainer.addEventListener(`click`, event => {
  if (store.getState().session.ui.isMapLoading) {
    return
  }

  const info = getTileCoordAndIndex({
    tileset: store.getState().session.map.get(`tileset`),
    containerWidth: tilesetCanvas.width * getScale(),
    pixelX: event.offsetX,
    pixelY: event.offsetY,
  })
  store.dispatch(selectTilesetTile({x: info.tileX, y: info.tileY, index: info.tileIndex}))
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
  globalMappoState.mapLayerTileHighlightCoord = null
})

const getTilesetColumns = ({tileset, containerWidth}) => {
  const scaledTileWidth = tileset.get(`tileWidth`) * getScale()
  return ~~(containerWidth / scaledTileWidth)
}

const getTilesetRows = ({tileset, containerWidth}) => {
  const tilesetColumns = getTilesetColumns({tileset, containerWidth})
  const roundedUpRows = roundedUpUnits(tileset.get(`numTiles`), tilesetColumns)
  return roundedUpRows
}

const tick = () => {
  clearCanvas({canvas, pattern: checkerboardPattern})
  clearCanvas({canvas: tilesetCanvas, pattern: checkerboardPattern})
  clearCanvas({canvas: tilesetSelectedTileCanvas, pattern: checkerboardPattern})
  clearCanvas({canvas: tilesetHoveringTileCanvas, pattern: checkerboardPattern})

  if (!store.getState().session.ui.isMapLoading) {
    const state = store.getState()
    const map = state.session.map
    const tileset = map.get(`tileset`)
    const tileWidth = tileset.get(`tileWidth`)
    const tileHeight = tileset.get(`tileHeight`)
    const containerWidth = tilesetCanvasContainer.offsetWidth

    const tileStartList = renderMap({
      map,
      tileset,
      tilesetImageBitmap,
      camera: state.session.ui.camera,
      canvas,
      context,
      layerHidden: state.session.ui.layerHidden,
    })

    // TODO(chuck): find a simpler way, this seems rather excessive
    // fixes #1: map tile highlight "jiggles" during fine movements
    const tileStartLayer = tileStartList.get(state.session.ui.selectedTileLayerIndex)
    if (tileStartLayer) {
      const highlightTileX = state.session.ui.highlightedMapTile.x
      const highlightTileY = state.session.ui.highlightedMapTile.y
      const {pixelStartX, pixelStartY, tileStartX, tileStartY} = tileStartLayer
      const x = ((highlightTileX - tileStartX) * tileWidth) + pixelStartX
      const y = ((highlightTileY - tileStartY) * tileHeight) + pixelStartY
      renderTileHighlightInvertedOutline({
        context,
        x,
        y,
        width: tileWidth,
        height: tileHeight,
      })
    }

    renderTileset({
      context: tilesetContext,
      tileset,
      tilesetImageBitmap,
      tilesetColumns: getTilesetColumns({tileset, containerWidth})
    })

    const {ui} = state.session
    renderTileHighlightInvertedSolid({
      context: tilesetContext,
      x: ui.highlightedTilesetTile.x * tileWidth,
      y: ui.highlightedTilesetTile.y * tileHeight,
      width: tileWidth,
      height: tileHeight,
    })
    renderTile({
      context: tilesetHoveringTileContext,
      tileset,
      tilesetImageBitmap,
      tileIndex: ui.highlightedTilesetTile.index,
      x: 0,
      y: 0,
    })
    tilesetHoveringTileIndex.innerText = ui.highlightedTilesetTile.index

    renderTileHighlightColorOutline({
      context: tilesetContext,
      x: ui.selectedTilesetTile.x * tileWidth,
      y: ui.selectedTilesetTile.y * tileHeight,
      color: `white`,
      width: tileWidth,
      height: tileHeight,
    })
    renderTile({
      context: tilesetSelectedTileContext,
      tileset,
      tilesetImageBitmap,
      tileIndex: state.session.ui.selectedTilesetTile.index,
      x: 0,
      y: 0,
    })
    tilesetSelectedTileIndex.innerText = state.session.ui.selectedTilesetTile.index

    if (keyboard.isPressed(keyboard.KEYCODE_CMD)) {
      if (keyboard.isPressed(keyboard.KEYCODE_Z)) {
        keyboard.release(keyboard.KEYCODE_Z)
        uiUndo()
      } else if (keyboard.isPressed(keyboard.KEYCODE_Y)) {
        keyboard.release(keyboard.KEYCODE_Y)
        uiRedo()
      }
    }

    // map zooming
    const prevZoomLevel = state.session.ui.zoomLevel
    if (keyboard.isPressed(`ctrlKey`)) {
      if (keyboard.isPressed(keyboard.KEYCODE_PLUS)) {
        keyboard.release(keyboard.KEYCODE_PLUS)
        store.dispatch(setZoomLevel(state.session.ui.zoomLevel + 1))
      }

      if (keyboard.isPressed(keyboard.KEYCODE_MINUS)) {
        keyboard.release(keyboard.KEYCODE_MINUS)
        store.dispatch(setZoomLevel(state.session.ui.zoomLevel - 1))
      }

      if (keyboard.isPressed(keyboard.KEYCODE_0)) {
        keyboard.release(keyboard.KEYCODE_0)
        store.dispatch(setZoomLevel(DEFAULT_ZOOM_LEVEL))
      }

      // TODO(chuck): hmm, tricky. dispatching to store generates new state
      // and therefore state.zoomLevel will still point to stale state (?)
      // look at this more closely soon and fully understand what's going on.
      if (prevZoomLevel !== store.getState().session.ui.zoomLevel) {
        resizeCanvas()
      }
    }
  }

  window.requestAnimationFrame(tick)
}

const stretchCanvasByZoom = canvas => {
  canvas.style.width = (canvas.width * getScale()) + `px`
  canvas.style.height = (canvas.height * getScale()) + `px`
}

const resizeCanvas = () => {
  canvas.width = roundedUpUnits(middlePanel.offsetWidth, getScale())
  canvas.height = roundedUpUnits(middlePanel.offsetHeight, getScale())
  stretchCanvasByZoom(canvas)

  if (!store.getState().session.ui.isMapLoading) {
    const containerWidth = tilesetCanvasContainer.offsetWidth
    const tileset = store.getState().session.map.get(`tileset`)
    tilesetCanvas.width = tilesetImageBitmap.width
    tilesetCanvas.height = tilesetImageBitmap.height
    stretchCanvasByZoom(tilesetCanvas)
  }
}

window.addEventListener(`resize`, resizeCanvas)
resizeCanvas()

tick()

const uiUndo = () => {
  const state = store.getState()
  if (state.session.plots.get(`undoIndex`) > 0) {
    store.dispatch(undo())
  }
}

const uiRedo = () => {
  const state = store.getState()
  if (state.session.plots.get(`undoIndex`) < state.session.plots.get(`plotHistory`).size) {
    store.dispatch(redo())
  }
}

undoButton.addEventListener(`click`, uiUndo)
redoButton.addEventListener(`click`, uiRedo)

const refreshUndoRedo = () => {
  if (store.getState().session.ui.isMapLoading) {
    undoButton.disabled = true
    redoButton.disabled = true
    return
  }

  const state = store.getState()
  if (state.session.plots && state.session.plots.get(`undoIndex`) > 0) {
    undoButton.removeAttribute(`disabled`)
  } else {
    undoButton.disabled = true
  }

  if (state.session.plots && state.session.plots.get(`undoIndex`) < state.session.plots.get(`plotHistory`).size) {
    redoButton.removeAttribute(`disabled`)
  } else {
    redoButton.disabled = true
  }
}

const saveChanges = debounce(() => {
  const state = store.getState()
  saveMappoConfig(state.config)
  if (state.config.recentMapFilename && state.config.recentMapFilename.length > 0) {
    fs.writeFileSync(state.config.recentMapFilename, JSON.stringify(state.session))
  }
}, 250)

const stateWatcher = reduxWatch(store.getState)
const reactToChanges = stateWatcher((newValue, oldValue, objectPath) => {
  saveChanges()
})
store.subscribe(reactToChanges)

const refreshLoadingStatus = () => {
  mappoEl.classList.toggle(`is-loading`, store.getState().session.ui.isMapLoading)
}

store.subscribe(recalcMaxMapSize)
store.subscribe(refreshMapLayerList)
store.subscribe(refreshUndoRedo)
store.subscribe(refreshLoadingStatus)

// sent from main process (index.js)
ipcRenderer.on(`windowBounds`, (event, bounds) => {
  const state = store.getState()

  if (
    bounds.width !== state.config.window.width ||
    bounds.height !== state.config.window.height
  ) {
    store.dispatch(setWindowSize({
      width: bounds.width,
      height: bounds.height,
    }))
  }

  if (
    bounds.x !== state.config.window.x ||
    bounds.y !== state.config.window.y
  ) {
    store.dispatch(setWindowPosition({
      x: bounds.x,
      y: bounds.y,
    }))
  }
})