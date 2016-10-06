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
const calcAutoScroll = require(`./calcAutoScroll`)
const clearCanvas = require(`./clearCanvas`)
const loadMappoMap = require(`./loadMappoMap`)
const createStore = require(`./createStore`)
const mappoState = require(`./mappoState`)
const loadMappoConfig = require(`./loadMappoConfig`)
const saveMappoConfig = require(`./saveMappoConfig`)

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
const store = createStore(mappoState)

const mappoConfigFromDisk = loadMappoConfig()
// TODO(chuck): how to handle this more naturally? with no special priming
if (mappoConfigFromDisk.map) {
  mappoConfigFromDisk.isDirtyTilesetImageBitmap = true
}

store.dispatch({type: `RELOAD_STORE`, state: mappoConfigFromDisk})
store.dispatch({type: `SELECTED_LAYER`, index: -1})
store.dispatch({type: `SELECTED_TILE`, index: -1})
store.dispatch({type: `SET_LOADING`, isLoading: true})

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

const viewportScales = [0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const DEFAULT_SCALE_INDEX = 4
const defaultGlobalMappoState = {
  scaleIndex: DEFAULT_SCALE_INDEX,
  mapLayerOrder: null,
  tileset: null,
  tilesetTileHovering: null,
  tilesetTileSelected: {},
  keyPressed: {},
  mouseDown: false,
  mouseInViewport: false,
  autoScroll: {},
}
let globalMappoState = cloneDeep(defaultGlobalMappoState)

const getScale = () => viewportScales[globalMappoState.scaleIndex]

let maxMapWidth = 0
let maxMapHeight = 0

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
    store.dispatch({type: `SELECT_LAYER`, index: 0})
    store.dispatch({type: `SELECT_TILESET_TILE`, index: 0})
    store.dispatch({type: `HIGHLIGHT_MAP_TILE`, x: 0, y: 0})

    refreshMapLayerList()

    pageTitle.innerText = `Mappo - ` + mapFilename
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
    if (state.layerHidden && state.layerHidden[index]) {
      li.classList.add(`is-layer-hidden`)
    }
    if (state.selectedTileLayerIndex === index) {
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
  const layer = map.tileLayers[state.selectedTileLayerIndex]
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
  if (state.seletedTileIndex !== -1 && state.selectedTileLayerIndex !== -1) {
    const {tileX, tileY} = getPlotCoord({
      viewportX: event.offsetX,
      viewportY: event.offsetY,
    })
    const layer = state.map.tileLayers[state.selectedTileLayerIndex]
    if (layer.tileIndexGrid[(tileY * layer.width) + tileX] === state.selectedTileIndex) {
      return
    }
    store.dispatch({
      type: `PLOT_TILE`,
      tileLayerIndex: state.selectedTileLayerIndex,
      tileLayers: state.map.tileLayers,
      tileIndexGridWidth: layer.width,
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

  globalMappoState.autoScroll = {}
  if (globalMappoState.mouseInViewport) {
    globalMappoState.autoScroll = calcAutoScroll({
      scale,
      threshold: (tileset.tileWidth + tileset.tileHeight) / 2,
      cursorX: event.offsetX,
      cursorY: event.offsetY,
      viewportWidth: middlePanel.offsetWidth,
      viewportHeight: middlePanel.offsetHeight,
    })
  }

  if (state.selectedTileLayerIndex !== -1) {
    const layer = state.map.tileLayers[state.selectedTileLayerIndex]
    const tileWidth = tileset.tileWidth
    const tileHeight = tileset.tileHeight
    const scaleX = ~~(event.offsetX / scale)
    const scaleY = ~~(event.offsetY / scale)
    const parallaxX = ~~(state.camera.x * layer.parallax.x)
    const parallaxY = ~~(state.camera.y * layer.parallax.y)
    const x = scaleX - ((parallaxX + scaleX) % tileWidth)
    const y = scaleY - ((parallaxY + scaleY) % tileHeight)

    if (x !== state.highlightedMapTile.x || y !== state.highlightedMapTile.y) {
      store.dispatch({type: `HIGHLIGHT_MAP_TILE`, x, y})
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
  if (store.getState().isLoading) {
    return
  }

  const map = store.getState().map
  map.tilesetTileHovering = getTileCoordAndIndex({
    tileset: map.tileset,
    containerWidth: tilesetCanvasContainer.offsetWidth,
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
    containerWidth: tilesetCanvasContainer.offsetWidth,
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
  globalMappoState.autoScroll = {}
  globalMappoState.mapLayerTileHighlightCoord = null
})

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

  if (!store.getState().isLoading) {
    const state = store.getState()
    const map = state.map
    const tileset = map.tileset
    const tileWidth = tileset.tileWidth
    const tileHeight = tileset.tileHeight
    const containerWidth = tilesetCanvasContainer.offsetWidth

    renderMap({
      map,
      tileset,
      tilesetImageBitmap,
      camera: state.camera,
      canvas,
      context,
      layerHidden: state.layerHidden,
    })

    renderTileHighlightInvertedOutline({
      context,
      x: state.highlightedMapTile.x,
      y: state.highlightedMapTile.y,
      width: tileWidth,
      height: tileHeight,
    })

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

    const autoScroll = globalMappoState.autoScroll
    if (autoScroll) {
      let moveX = 0
      let moveY = 0
      const cameraScrollAmount = 1

      if (keyboard.isPressed(keyboard.KEYCODE_UP) || autoScroll.x < 0) {
        moveY = -cameraScrollAmount
      }

      if (keyboard.isPressed(keyboard.KEYCODE_DOWN) || autoScroll.y > 0) {
        moveY = +cameraScrollAmount
      }

      if (keyboard.isPressed(keyboard.KEYCODE_LEFT) || autoScroll.x < 0) {
        moveX = -cameraScrollAmount
      }

      if (keyboard.isPressed(keyboard.KEYCODE_RIGHT) || autoScroll.x > 0) {
        moveX = +cameraScrollAmount
      }

      moveCamera(moveX, moveY)
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

  if (!store.getState().isLoading) {
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

const rebuildTilesetImageBitmap = () => {
  const state = store.getState()
  if (!state.isDirtyTilesetImageBitmap) {
    return
  }

  const tileset = state.map.tileset
  convertRaw32bitDataToImageBitmap({
    context,
    raw32bitData: tileset.raw32bitData,
    width: tileset.tileWidth,
    height: tileset.tileHeight,
    numTiles: tileset.numTiles,
  }).then(imageBitmap => {
    tilesetImageBitmap = imageBitmap
    store.dispatch({type: `BUILT_TILESET_IMAGE_BITMAP`})
    store.dispatch({type: `SET_LOADING`, isLoading: false})
    saveMappoConfig(store.getState())
    resizeCanvas()

    tilesetSelectedTileCanvas.width = tileset.tileWidth
    tilesetSelectedTileCanvas.height = tileset.tileHeight
    tilesetHoveringTileCanvas.width = tileset.tileWidth
    tilesetHoveringTileCanvas.height = tileset.tileHeight
  })
}

const undo = () => {
  const state = store.getState()
  if (state.plots.past.length) {
    store.dispatch({type: `UNDO`})
  }
}

const redo = () => {
  const state = store.getState()
  if (state.plots.future.length) {
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
  if (state.plots && state.plots.past.length > 0) {
    undoButton.removeAttribute(`disabled`)
  } else {
    undoButton.disabled = true
  }

  if (state.plots && state.plots.future.length > 0) {
    redoButton.removeAttribute(`disabled`)
  } else {
    redoButton.disabled = true
  }
}

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

const autoSave = () => {
  if (isAutoSaving) {
    console.log(`isAutoSaving, early out...`)
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

store.subscribe(recalcMaxMapSize)
store.subscribe(refreshMapLayerList)
store.subscribe(rebuildTilesetImageBitmap)
store.subscribe(refreshUndoRedo)

store.dispatch({
  type: `SET_EDITOR_WINDOW_SIZE`,
  width: window.outerWidth,
  height: window.outerHeight,
})

setInterval(autoSave, 5 * 1000)
