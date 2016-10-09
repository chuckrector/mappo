"use strict"

const asset = require(`./asset`)
const colorDepth = require(`./converter/colorDepth`)
const clamp = require(`lodash/clamp`)
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
const {createStore} = require(`redux`)
const loadMappoConfig = require(`./loadMappoConfig`)
const saveMappoConfig = require(`./saveMappoConfig`)
const mappoApp = require(`./reducers/mappoApp`)
const ZOOM_LEVELS = require(`./reducers/zoomLevels`)
const DEFAULT_ZOOM_LEVEL = require(`./reducers/defaultZoomLevel`)
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

// TODO(chuck): move into default state?
const store = createStore(mappoApp)

const mappoConfigFromDisk = loadMappoConfig()
// TODO(chuck): how to handle this more naturally? with no special priming
if (mappoConfigFromDisk.map) {
  mappoConfigFromDisk.isDirtyTilesetImageBitmap = true
}

store.dispatch({type: `RELOAD_STORE`, state: mappoConfigFromDisk})
store.dispatch({type: `SELECTED_LAYER`, index: -1})
store.dispatch({type: `SELECTED_TILE`, index: -1})
store.dispatch({type: `SET_LOADING`, isLoading: true})

if (store.getState().ui.zoomLevel === undefined) {
  store.dispatch({type: `SET_ZOOM_LEVEL`, zoomLevel: DEFAULT_ZOOM_LEVEL})
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
  map.tileLayers.forEach(layer => {
    if (maxMapWidth < layer.width) {
      maxMapWidth = layer.width
    }
    if (maxMapHeight < layer.height) {
      maxMapHeight = layer.height
    }
  })
}

recalcMaxMapSize()

const moveCamera = (moveX, moveY) => {
  const state = store.getState()
  const map = state.map
  const mapWidth = maxMapWidth
  const mapHeight = maxMapHeight
  const tileWidth = map.tileset.tileWidth
  const tileHeight = map.tileset.tileHeight
  const maxX = mapWidth * tileWidth - canvas.width
  const maxY = mapHeight * tileHeight - canvas.height
  const newX = clamp(state.camera.x + moveX, 0, maxX)
  const newY = clamp(state.camera.y + moveY, 0, maxY)

  if (newX !== state.camera.x || newY !== state.camera.y) {
    store.dispatch({type: `MOVE_CAMERA`, x: newX, y: newY})
  }
}

let lastSaveTimestamp = new Date()
let isAutoSaving = false

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
    store.dispatch({type: `SET_LOADING`, isLoading: true})

    const map = loadMappoMap({context, mapFilename: `data/` + mapFilename})
    store.dispatch({type: `MOVE_CAMERA`, x: 0, y: 0})
    // TODO(chuck): map contains ImageBitmaps, which is not good for redux.
    //              figure out a better way to store this so that the full
    //              state can be written to disk and reloaded later without
    //              problems.
    store.dispatch({type: `SET_MAP`, map})
    store.dispatch({type: `RESET_LAYER_VISIBILITIES`})
    store.dispatch({type: `SELECT_LAYER`, index: 0})
    store.dispatch({type: `SELECT_TILESET_TILE`, index: 0})
    store.dispatch({type: `HIGHLIGHT_MAP_TILE`, x: 0, y: 0})

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
  state.map.tileLayers.forEach((layer, index) => {
    const li = document.createElement(`li`)
    li.setAttribute(`title`, layer.description)
    li.innerText = layer.description
    li.classList.add(`layer-list-item`)
    if (state.ui.layerHidden && state.ui.layerHidden[index]) {
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
        store.dispatch({type: `SELECT_LAYER`, index})
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
  if (store.getState().isLoading) {
    return
  }
})

const getPlotCoord = ({viewportX, viewportY}) => {
  const scale = getScale()
  const state = store.getState()
  const map = state.map
  const tileWidth = map.tileset.tileWidth
  const tileHeight = map.tileset.tileHeight
  const viewportScaleX = ~~(viewportX / scale)
  const viewportScaleY = ~~(viewportY / scale)
  const layer = map.tileLayers[state.ui.selectedTileLayerIndex]
  const parallaxX = ~~(state.camera.x * layer.parallax.x)
  const parallaxY = ~~(state.camera.y * layer.parallax.y)
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
    const layer = state.map.tileLayers[state.ui.selectedTileLayerIndex]
    if (layer.tileIndexGrid[(tileY * layer.width) + tileX] === state.selectedTileIndex) {
      return
    }
    store.dispatch({
      type: `PLOT_TILE`,
      tileLayerIndex: state.ui.selectedTileLayerIndex,
      tileLayers: state.map.tileLayers,
      tileIndexToPlot: state.selectedTileIndex,
      x: tileX,
      y: tileY,
    })
  } else {
    console.log(`*warning* no tile selected, not plotting anything...`)
  }
}

middlePanel.addEventListener(`mousemove`, event => {
  if (store.getState().isLoading) {
    return
  }

  const scale = getScale()
  const state = store.getState()
  const map = state.map
  const tileset = map.tileset

  if (globalMappoState.mouseDown) {
    if (keyboard.isPressed(`altKey`)) {
      moveCamera(
        -event.movementX / scale,
        -event.movementY / scale
      )
    } else {
      plot(event)
    }
  }

  if (state.ui.selectedTileLayerIndex !== -1) {
    const layer = state.map.tileLayers[state.ui.selectedTileLayerIndex]
    const tileWidth = tileset.tileWidth
    const tileHeight = tileset.tileHeight
    const scaleX = event.offsetX / scale
    const scaleY = event.offsetY / scale
    const parallaxX = state.camera.x * layer.parallax.x
    const parallaxY = state.camera.y * layer.parallax.y
    const tileX = ~~((parallaxX + scaleX) / tileWidth)
    const tileY = ~~((parallaxY + scaleY) / tileHeight)

    if (tileX !== state.highlightedMapTile.tileX || tileY !== state.highlightedMapTile.tileY) {
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
  const tilesetColumns = tileset.tileColumns
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
  if (store.getState().isLoading) {
    return
  }

  const map = store.getState().map
  map.tilesetTileHovering = getTileCoordAndIndex({
    tileset: map.tileset,
    containerWidth: tilesetCanvas.width * getScale(),
    pixelX: event.offsetX,
    pixelY: event.offsetY,
  })
})

tilesetCanvasContainer.addEventListener(`click`, event => {
  if (store.getState().isLoading) {
    return
  }

  const info = getTileCoordAndIndex({
    tileset: store.getState().map.tileset,
    containerWidth: tilesetCanvas.width * getScale(),
    pixelX: event.offsetX,
    pixelY: event.offsetY,
  })
  globalMappoState.tilesetTileSelected.tileX = info.tileX
  globalMappoState.tilesetTileSelected.tileY = info.tileY
  store.dispatch({type: `SELECT_TILESET_TILE`, index: info.tileIndex})
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
  const scaledTileWidth = tileset.tileWidth * getScale()
  return ~~(containerWidth / scaledTileWidth)
}

const getTilesetRows = ({tileset, containerWidth}) => {
  const tilesetColumns = getTilesetColumns({tileset, containerWidth})
  const roundedUpRows = roundedUpUnits(tileset.numTiles, tilesetColumns)
  return roundedUpRows
}

const tick = () => {
  clearCanvas({canvas, pattern: checkerboardPattern})
  clearCanvas({canvas: tilesetCanvas, pattern: checkerboardPattern})
  clearCanvas({canvas: tilesetSelectedTileCanvas, pattern: checkerboardPattern})
  clearCanvas({canvas: tilesetHoveringTileCanvas, pattern: checkerboardPattern})

  if (!store.getState().isLoading) {
    const state = store.getState()
    const map = state.map
    const tileset = map.tileset
    const tileWidth = tileset.tileWidth
    const tileHeight = tileset.tileHeight
    const containerWidth = tilesetCanvasContainer.offsetWidth

    const tileStartList = renderMap({
      map,
      tileset,
      tilesetImageBitmap,
      camera: state.camera,
      canvas,
      context,
      layerHidden: state.ui.layerHidden,
    })

    // TODO(chuck): find a simpler way, this seems rather excessive
    // fixes #1: map tile highlight "jiggles" during fine movements
    const tileStartLayer = tileStartList[state.ui.selectedTileLayerIndex]
    if (tileStartLayer) {
      const highlightTileX = state.highlightedMapTile.tileX
      const highlightTileY = state.highlightedMapTile.tileY
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
        x: map.tilesetTileHovering.tileX * tileWidth,
        y: map.tilesetTileHovering.tileY * tileHeight,
        width: tileWidth,
        height: tileHeight,
      })
      renderTile({
        context: tilesetHoveringTileContext,
        tileset,
        tilesetImageBitmap,
        tileIndex: map.tilesetTileHovering.tileIndex,
        x: 0,
        y: 0,
      })

      tilesetHoveringTileIndex.innerText = map.tilesetTileHovering.tileIndex
    }

    if (state.selectedTileIndex !== -1) {
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
        tileIndex: state.selectedTileIndex,
        x: 0,
        y: 0,
      })

      tilesetSelectedTileIndex.innerText = state.selectedTileIndex
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
        store.dispatch({type: `SET_ZOOM_LEVEL`, zoomLevel: state.ui.zoomLevel + 1})
      }

      if (keyboard.isPressed(keyboard.KEYCODE_MINUS)) {
        keyboard.release(keyboard.KEYCODE_MINUS)
        store.dispatch({type: `SET_ZOOM_LEVEL`, zoomLevel: state.ui.zoomLevel - 1})
      }

      if (keyboard.isPressed(keyboard.KEYCODE_0)) {
        keyboard.release(keyboard.KEYCODE_0)
        store.dispatch({type: `SET_ZOOM_LEVEL`, zoomLevel: DEFAULT_ZOOM_LEVEL})
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

  if (!store.getState().isLoading) {
    const containerWidth = tilesetCanvasContainer.offsetWidth
    const tileset = store.getState().map.tileset
    tilesetCanvas.width = tilesetImageBitmap.width
    tilesetCanvas.height = tilesetImageBitmap.height
    stretchCanvasByZoom(tilesetCanvas)
  }
}

window.addEventListener(`resize`, resizeCanvas)
resizeCanvas()

tick()

let tilesetImageLoading

const rebuildTilesetImageBitmap = () => {
  const state = store.getState()
  if (!state.isDirtyTilesetImageBitmap) {
    return
  }

  if (tilesetImageLoading) {
    return
  }

  const {map} = state
  const {tileset} = map
  // auto-convert tileset to PNG if it doesn't already exist
  const vspImageExists = fs.existsSync(tileset.imageFilename)

  let tilesetResolve
  const tilesetPromise = new Promise((resolve, reject) => {
    tilesetResolve = resolve
  })

  if (!vspImageExists) {
    console.log(`generating`, tileset.imageFilename, `...`)

    const raw32bitData = createMappoTilesetRaw32bitData(tileset)
    const converter = createTileGridConverter({
      tileWidth: tileset.tileWidth,
      tileHeight: tileset.tileHeight,
      columns: tileset.tileColumns,
      numtiles: tileset.numTiles,
      raw32bitData,
    })

    const png = converter.convertToPng()
    const writer = fs.createWriteStream(tileset.imageFilename)
    png.pack().pipe(writer)
    writer.on(`finish`, tilesetResolve)
  } else {
    tilesetResolve()
  }

  tilesetPromise.then(() => {
    const tileset = state.map.tileset
    const tilesetImage = new Image()
    tilesetImageLoading = true
    tilesetImage.addEventListener(`load`, () => {
      tilesetImageBitmap = tilesetImage
      store.dispatch({type: `BUILT_TILESET_IMAGE_BITMAP`})
      store.dispatch({type: `SET_LOADING`, isLoading: false})
      saveMappoConfig(store.getState())
      resizeCanvas()

      tilesetSelectedTileCanvas.width = tileset.tileWidth
      tilesetSelectedTileCanvas.height = tileset.tileHeight
      tilesetHoveringTileCanvas.width = tileset.tileWidth
      tilesetHoveringTileCanvas.height = tileset.tileHeight
      tilesetImageLoading = false
    })

    const relativePath = path.resolve(`.`, tileset.imageFilename)
    tilesetImage.src = relativePath
  })
}

const undo = () => {
  const state = store.getState()
  if (state.plots.undoIndex > 0) {
    store.dispatch({type: `UNDO`})
  }
}

const redo = () => {
  const state = store.getState()
  if (state.plots.undoIndex < state.plots.plotHistory.length) {
    store.dispatch({type: `REDO`})
  }
}

undoButton.addEventListener(`click`, undo)
redoButton.addEventListener(`click`, redo)

const refreshUndoRedo = () => {
  if (store.getState().isLoading) {
    undoButton.disabled = true
    redoButton.disabled = true
    return
  }

  const state = store.getState()
  if (state.plots && state.plots.undoIndex > 0) {
    undoButton.removeAttribute(`disabled`)
  } else {
    undoButton.disabled = true
  }

  if (state.plots && state.plots.undoIndex < state.plots.plotHistory.length) {
    redoButton.removeAttribute(`disabled`)
  } else {
    redoButton.disabled = true
  }
}

const autoSave = () => {
  if (isAutoSaving) {
    return
  }

  const currentTime = new Date()
  const timeSinceLastSave = currentTime - lastSaveTimestamp

  let shouldSave = false
  if (!store.getState().isMapDirty) {
    console.log(`not dirty, checking 1min limit...`)
    if (timeSinceLastSave > 60 * 1000) {
      console.log(`one minute elapsed. auto-saving session...`)
      shouldSave = true
    }
  } else if (timeSinceLastSave > 10 * 1000) {
    console.log(`5 seconds passed since last edit. auto-saving session...`)
    shouldSave = true
  }

  if (shouldSave) {
    isAutoSaving = true
    saveMappoConfig(store.getState())
    store.dispatch({type: `SET_MAP_DIRTY`, isMapDirty: false})
    lastSaveTimestamp = new Date()
    isAutoSaving = false
  }
}

const refreshLoadingStatus = () => {
  const state = store.getState()
  if (state.isLoading) {
    document.body.classList.add(`is-loading`)
  } else {
    document.body.classList.remove(`is-loading`)
  }
}

store.subscribe(recalcMaxMapSize)
store.subscribe(refreshMapLayerList)
store.subscribe(rebuildTilesetImageBitmap)
store.subscribe(refreshUndoRedo)
store.subscribe(refreshLoadingStatus)

store.dispatch({
  type: `SET_EDITOR_WINDOW_SIZE`,
  width: window.outerWidth,
  height: window.outerHeight,
})

setInterval(autoSave, 5 * 1000)
