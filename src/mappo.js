"use strict"

const {ipcRenderer} = require(`electron`)
const {createStore, applyMiddleware} = require(`redux`)
const thunk = require(`redux-thunk`).default
const reduxWatch = require(`redux-watch`)
const {List, Map, fromJS} = require(`immutable`)

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
const loadMappoMap = require(`./loadMappoMap`)
const createMappoTilesetRaw32bitData = require(`./createMappoTilesetRaw32bitData`)
const loadMappoConfig = require(`./loadMappoConfig`)
const saveMappoConfig = require(`./saveMappoConfig`)
const mappoApp = require(`./reducers/mappoApp`)
const ZOOM_LEVELS = require(`./reducers/zoomLevels`)
const DEFAULT_ZOOM_LEVEL = require(`./reducers/defaultZoomLevel`)
const {
  builtTilesetImageBitmap,
  moveCamera,
  plotTile,
  resetLayerVisibilities,
  selectLayer,
  selectTilesetTile,
  setMap,
  setMapLoading,
  setZoomLevel,
} = require(`./actions/index`)
const roundedUpUnits = require(`./roundedUpUnits`)
const createTileGridConverter = require(`./converter/createTileGridConverter`)

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
const undoButton = document.querySelector(`.undo`)
const redoButton = document.querySelector(`.redo`)

const checkerboardPattern = createCheckerboardPattern({document})

let tilesetImageBitmap

const mappoConfigFromDisk = loadMappoConfig()

let tilesetImageLoading

const rebuildTilesetImageBitmap = () => {
  const state = store.getState()

  if (tilesetImageLoading) {
    return
  }

  const {map} = state
  const tileset = map.get(`tileset`)
  // auto-convert tileset to PNG if it doesn't already exist
  const vspImageExists = fs.existsSync(tileset.get(`imageFilename`))

  let tilesetResolve
  const tilesetPromise = new Promise((resolve, reject) => {
    tilesetResolve = resolve
  })

  if (!vspImageExists) {
    console.log(`generating`, tileset.get(`imageFilename`), `...`)

    const raw32bitData = createMappoTilesetRaw32bitData(tileset)
    const converter = createTileGridConverter({
      tileWidth: tileset.get(`tileWidth`),
      tileHeight: tileset.get(`tileHeight`),
      columns: tileset.get(`tileColumns`),
      numtiles: tileset.get(`numTiles`),
      raw32bitData,
    })

    const png = converter.convertToPng()
    const writer = fs.createWriteStream(tileset.get(`imageFilename`))
    png.pack().pipe(writer)
    writer.on(`finish`, tilesetResolve)
  } else {
    tilesetResolve()
  }

  tilesetPromise.then(() => {
    const tileset = state.map.get(`tileset`)
    const tilesetImage = new Image()
    tilesetImageLoading = true
    tilesetImage.addEventListener(`load`, () => {
      tilesetImageBitmap = tilesetImage
      store.dispatch(builtTilesetImageBitmap())
      store.dispatch(setMapLoading(false))
      saveMappoConfig(store.getState())
      resizeCanvas()

      tilesetSelectedTileCanvas.width = tileset.get(`tileWidth`)
      tilesetSelectedTileCanvas.height = tileset.get(`tileHeight`)
      tilesetHoveringTileCanvas.width = tileset.get(`tileWidth`)
      tilesetHoveringTileCanvas.height = tileset.get(`tileHeight`)
      tilesetImageLoading = false
    })

    const relativePath = path.resolve(`.`, tileset.get(`imageFilename`))
    tilesetImage.src = relativePath
  })
}

// TODO(chuck): remove once fully converted to immutable.js stuff
if (mappoConfigFromDisk.ui) {
  if (mappoConfigFromDisk.ui.camera) {
    mappoConfigFromDisk.ui.camera = Map(mappoConfigFromDisk.ui.camera)
  }
  if (mappoConfigFromDisk.ui.layerHidden) {
    mappoConfigFromDisk.ui.layerHidden = List(mappoConfigFromDisk.ui.layerHidden)
  }
}

if (mappoConfigFromDisk.plots) {
  mappoConfigFromDisk.plots = fromJS(mappoConfigFromDisk.plots)
}
if (mappoConfigFromDisk.map) {
  mappoConfigFromDisk.map = fromJS(mappoConfigFromDisk.map)
}

const store = createStore(mappoApp, mappoConfigFromDisk, applyMiddleware(thunk))
// TODO(chuck): any way for this to happen as part of initial hydration?
if (store.getState().map) {
  rebuildTilesetImageBitmap()
}

store.dispatch(setMapLoading(true))

if (store.getState().ui.zoomLevel === undefined) {
  store.dispatch(setZoomLevel(DEFAULT_ZOOM_LEVEL))
}

let maxMapWidth = 0
let maxMapHeight = 0

const recalcMaxMapSize = () => {
  const state = store.getState()
  if (!state.map) {
    return
  }
  const map = state.map

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
  const map = state.map
  const mapWidth = maxMapWidth
  const mapHeight = maxMapHeight
  const tileWidth = map.getIn([`tileset`, `tileWidth`])
  const tileHeight = map.getIn([`tileset`, `tileHeight`])
  const maxX = mapWidth * tileWidth - canvas.width
  const maxY = mapHeight * tileHeight - canvas.height
  const newX = clamp(state.ui.camera.get(`x`) + moveX, 0, maxX)
  const newY = clamp(state.ui.camera.get(`y`) + moveY, 0, maxY)

  if (newX !== state.ui.camera.get(`x`) || newY !== state.ui.camera.get(`y`)) {
    store.dispatch(moveCamera({x: newX, y: newY}))
  }
}

let lastSaveTimestamp = new Date()
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

const defaultGlobalMappoState = {
  mapLayerOrder: null,
  tileset: null,
  tilesetTileHovering: null,
  tilesetTileSelected: {},
  keyPressed: {},
  mouseDown: false,
  mouseInViewport: false,
}
let globalMappoState = cloneDeep(defaultGlobalMappoState)

const getScale = () => ZOOM_LEVELS[store.getState().ui.zoomLevel]

mappoSession.getMapFilenames().forEach(mapFilename => {
  const li = document.createElement(`li`)
  li.setAttribute(`title`, mapFilename)
  li.innerText = mapFilename
  // TODO(chuck): temp hack for windows. figure out better launchFolder shenanigans
  li.addEventListener(`click`, event => {
    globalMappoState = cloneDeep(defaultGlobalMappoState)
    store.dispatch(setMapLoading(true))

    const map = fromJS(loadMappoMap({context, mapFilename: `data/` + mapFilename}))
    store.dispatch(moveCamera({x: 0, y: 0}))
    // TODO(chuck): map contains ImageBitmaps, which is not good for redux.
    //              figure out a better way to store this so that the full
    //              state can be written to disk and reloaded later without
    //              problems.
    store.dispatch(setMap(map))
    store.dispatch(resetLayerVisibilities())
    store.dispatch(selectLayer(0))
    store.dispatch(selectTilesetTile(0))
    store.dispatch({type: `HIGHLIGHT_MAP_TILE`, x: 0, y: 0})

    rebuildTilesetImageBitmap()
    refreshMapLayerList()

    pageTitle.innerText = `mappo - ` + mapFilename
  })
  mapList.appendChild(li)
})

const refreshMapLayerList = () => {
  const state = store.getState()
  if (!state.map) {
    return
  }
  layerList.innerHTML = ``
  state.map.get(`tileLayers`).forEach((layer, index) => {
    const li = document.createElement(`li`)
    li.setAttribute(`title`, layer.get(`description`))
    li.innerText = layer.get(`description`)
    li.classList.add(`layer-list-item`)
    if (state.ui.layerHidden && state.ui.layerHidden.get(index)) {
      li.classList.add(`is-layer-hidden`)
    }
    if (state.ui.selectedTileLayerIndex === index) {
      li.classList.add(`selected`)
    }
    li.addEventListener(`click`, event => {
      // TODO(chuck): use a proper element?
      if (event.offsetX < 35) {
        store.dispatch({type: `TOGGLE_LAYER_VISIBILITY`, index})
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
  if (store.getState().ui.isMapLoading) {
    return
  }
})

const getPlotCoord = ({viewportX, viewportY}) => {
  const scale = getScale()
  const state = store.getState()
  const map = state.map
  const tileWidth = map.getIn([`tileset`, `tileWidth`])
  const tileHeight = map.getIn([`tileset`, `tileHeight`])
  const viewportScaleX = ~~(viewportX / scale)
  const viewportScaleY = ~~(viewportY / scale)
  const layer = map.getIn([`tileLayers`, `${state.ui.selectedTileLayerIndex}`])
  const parallaxX = ~~(state.ui.camera.get(`x`) * layer.getIn([`parallax`, `x`]))
  const parallaxY = ~~(state.ui.camera.get(`y`) * layer.getIn([`parallax`, `y`]))
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
  if (state.seletedTileIndex !== -1 && state.ui.selectedTileLayerIndex !== -1) {
    const {tileX, tileY} = getPlotCoord({
      viewportX: event.offsetX,
      viewportY: event.offsetY,
    })
    const layer = state.map.getIn([`tileLayers`, `${state.ui.selectedTileLayerIndex}`])
    if (layer.get(`tileIndexGrid`).get((tileY * layer.get(`width`)) + tileX) === state.ui.selectedTileIndex) {
      return
    }
    store.dispatch(plotTile({
      tileLayerIndex: state.ui.selectedTileLayerIndex,
      tileLayers: state.map.get(`tileLayers`),
      tileIndexToPlot: state.ui.selectedTileIndex,
      x: tileX,
      y: tileY,
    }))
  } else {
    console.log(`*warning* no tile selected, not plotting anything...`)
  }
}

middlePanel.addEventListener(`mousemove`, event => {
  if (store.getState().ui.isMapLoading) {
    return
  }

  const scale = getScale()
  const state = store.getState()
  const map = state.map
  const tileset = map.get(`tileset`)

  if (globalMappoState.mouseDown) {
    if (keyboard.isPressed(`altKey`)) {
      moveCameraRelatively(
        -event.movementX / scale,
        -event.movementY / scale
      )
    } else {
      plot(event)
    }
  }

  if (state.ui.selectedTileLayerIndex !== -1) {
    const layer = state.map.getIn([`tileLayers`, state.ui.selectedTileLayerIndex])
    const tileWidth = tileset.get(`tileWidth`)
    const tileHeight = tileset.get(`tileHeight`)
    const scaleX = event.offsetX / scale
    const scaleY = event.offsetY / scale
    const parallaxX = state.ui.camera.get(`x`) * layer.getIn([`parallax`, `x`])
    const parallaxY = state.ui.camera.get(`y`) * layer.getIn([`parallax`, `y`])
    const tileX = ~~((parallaxX + scaleX) / tileWidth)
    const tileY = ~~((parallaxY + scaleY) / tileHeight)

    if (tileX !== state.ui.highlightedMapTile.tileX || tileY !== state.ui.highlightedMapTile.tileY) {
      store.dispatch({type: `HIGHLIGHT_MAP_TILE`, tileX, tileY})
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
  if (store.getState().ui.isMapLoading) {
    return
  }

  let map = store.getState().map
  // TODO(chuck): no bueno. create a proper redux action
  map = map.set(`tilesetTileHovering`, getTileCoordAndIndex({
    tileset: map.get(`tileset`),
    containerWidth: tilesetCanvas.width * getScale(),
    pixelX: event.offsetX,
    pixelY: event.offsetY,
  }))
})

tilesetCanvasContainer.addEventListener(`click`, event => {
  if (store.getState().ui.isMapLoading) {
    return
  }

  const info = getTileCoordAndIndex({
    tileset: store.getState().map.get(`tileset`),
    containerWidth: tilesetCanvas.width * getScale(),
    pixelX: event.offsetX,
    pixelY: event.offsetY,
  })
  globalMappoState.tilesetTileSelected.tileX = info.tileX
  globalMappoState.tilesetTileSelected.tileY = info.tileY
  store.dispatch(selectTilesetTile(info.tileIndex))
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

  if (!store.getState().ui.isMapLoading) {
    const state = store.getState()
    const map = state.map
    const tileset = map.get(`tileset`)
    const tileWidth = tileset.get(`tileWidth`)
    const tileHeight = tileset.get(`tileHeight`)
    const containerWidth = tilesetCanvasContainer.offsetWidth

    const tileStartList = renderMap({
      map,
      tileset,
      tilesetImageBitmap,
      camera: state.ui.camera,
      canvas,
      context,
      layerHidden: state.ui.layerHidden,
    })

    // TODO(chuck): find a simpler way, this seems rather excessive
    // fixes #1: map tile highlight "jiggles" during fine movements
    const tileStartLayer = tileStartList.get(state.ui.selectedTileLayerIndex)
    if (tileStartLayer) {
      const highlightTileX = state.ui.highlightedMapTile.tileX
      const highlightTileY = state.ui.highlightedMapTile.tileY
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

    if (map.tilesetTileHovering) {
      renderTileHighlightInvertedSolid({
        context: tilesetContext,
        x: map.getIn([`tilesetTileHovering`, `tileX`]) * tileWidth,
        y: map.getIn([`tilesetTileHovering`, `tileY`]) * tileHeight,
        width: tileWidth,
        height: tileHeight,
      })
      renderTile({
        context: tilesetHoveringTileContext,
        tileset,
        tilesetImageBitmap,
        tileIndex: map.getIn([`tilesetTileHovering`, `tileIndex`]),
        x: 0,
        y: 0,
      })

      tilesetHoveringTileIndex.innerText = map.getIn([`tilesetTileHovering`, `tileIndex`])
    }

    if (state.ui.selectedTileIndex !== -1) {
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
        tileset,
        tilesetImageBitmap,
        tileIndex: state.ui.selectedTileIndex,
        x: 0,
        y: 0,
      })

      tilesetSelectedTileIndex.innerText = state.ui.selectedTileIndex
    }

    if (keyboard.isPressed(keyboard.KEYCODE_CMD)) {
      if (keyboard.isPressed(keyboard.KEYCODE_Z)) {
        keyboard.release(keyboard.KEYCODE_Z)
        undo()
      } else if (keyboard.isPressed(keyboard.KEYCODE_Y)) {
        keyboard.release(keyboard.KEYCODE_Y)
        redo()
      }
    }

    // map zooming
    const prevZoomLevel = state.ui.zoomLevel
    if (keyboard.isPressed(`ctrlKey`)) {
      if (keyboard.isPressed(keyboard.KEYCODE_PLUS)) {
        keyboard.release(keyboard.KEYCODE_PLUS)
        store.dispatch(setZoomLevel(state.ui.zoomLevel + 1))
      }

      if (keyboard.isPressed(keyboard.KEYCODE_MINUS)) {
        keyboard.release(keyboard.KEYCODE_MINUS)
        store.dispatch(setZoomLevel(state.ui.zoomLevel - 1))
      }

      if (keyboard.isPressed(keyboard.KEYCODE_0)) {
        keyboard.release(keyboard.KEYCODE_0)
        store.dispatch(setZoomLevel(DEFAULT_ZOOM_LEVEL))
      }

      // TODO(chuck): hmm, tricky. dispatching to store generates new state
      // and therefore state.zoomLevel will still point to stale state (?)
      // look at this more closely soon and fully understand what's going on.
      if (prevZoomLevel !== store.getState().ui.zoomLevel) {
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

  if (!store.getState().ui.isMapLoading) {
    const containerWidth = tilesetCanvasContainer.offsetWidth
    const tileset = store.getState().map.get(`tileset`)
    tilesetCanvas.width = tilesetImageBitmap.width
    tilesetCanvas.height = tilesetImageBitmap.height
    stretchCanvasByZoom(tilesetCanvas)
  }
}

window.addEventListener(`resize`, resizeCanvas)
resizeCanvas()

tick()

const undo = () => {
  const state = store.getState()
  if (state.plots.get(`undoIndex`) > 0) {
    store.dispatch({type: `UNDO`})
  }
}

const redo = () => {
  const state = store.getState()
  if (state.plots.get(`undoIndex`) < state.plots.get(`plotHistory`).size) {
    store.dispatch({type: `REDO`})
  }
}

undoButton.addEventListener(`click`, undo)
redoButton.addEventListener(`click`, redo)

const refreshUndoRedo = () => {
  if (store.getState().ui.isMapLoading) {
    undoButton.disabled = true
    redoButton.disabled = true
    return
  }

  const state = store.getState()
  if (state.plots && state.plots.get(`undoIndex`) > 0) {
    undoButton.removeAttribute(`disabled`)
  } else {
    undoButton.disabled = true
  }

  if (state.plots && state.plots.get(`undoIndex`) < state.plots.get(`plotHistory`).size) {
    redoButton.removeAttribute(`disabled`)
  } else {
    redoButton.disabled = true
  }
}

const saveChanges = debounce(() => {
  saveMappoConfig(store.getState())
}, 250)

const stateWatcher = reduxWatch(store.getState)
const reactToChanges = stateWatcher((newValue, oldValue, objectPath) => {
  saveChanges()
})
store.subscribe(reactToChanges)

const refreshLoadingStatus = () => {
  document.body.classList.toggle(`is-loading`, store.getState().ui.isMapLoading)
}

store.subscribe(recalcMaxMapSize)
store.subscribe(refreshMapLayerList)
store.subscribe(refreshUndoRedo)
store.subscribe(refreshLoadingStatus)

// sent from main process (index.js)
ipcRenderer.on(`windowBounds`, (event, bounds) => {
  const state = store.getState()
  if (
    bounds.width !== state.ui.windowSize.width ||
    bounds.height !== state.ui.windowSize.height
  ) {
    store.dispatch({
      type: `SET_WINDOW_SIZE`,
      width: bounds.width,
      height: bounds.height,
    })
  }

  if (
    bounds.x !== state.ui.windowSize.x ||
    bounds.y !== state.ui.windowSize.y
  ) {
    store.dispatch({
      type: `SET_WINDOW_POSITION`,
      x: bounds.x,
      y: bounds.y,
    })
  }
})