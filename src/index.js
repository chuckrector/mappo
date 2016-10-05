"use strict"

// This is the Electron entry point. The chain of command is:
// Electron binary -> index.js -> index.html -> mappo.js

const electron = require(`electron`)
const {app, BrowserWindow} = require(`electron`)
const fs = require(`fs`)

let win

const loadMappoConfig = () => {
  try {
    const mappoConfigText = fs.readFileSync(`mappo.json`)

    try {
      return JSON.parse(mappoConfigText)
    } catch (exc) {
      console.log(`bad config file, using defaults. [error: ${exc.message}]`)
    }
  } catch (exc) {
    console.log(`no mappo.json found, using defaults. [error: ${exc.message}]`)
  }

  return {}
}

const saveMappoConfig = config => {
  let mappoConfigText
  try {
    mappoConfigText = JSON.stringify(config)
  } catch (exc) {
    console.log(`bad config object, not saving config. [error: ${exc.message}]`)
    return
  }

  try {
    fs.writeFileSync(`mappo.json`, mappoConfigText)
    console.log(`editor state successfully saved`)
  } catch (exc) {
    console.log(`unable to write config to disk. [error: ${exc.message}]`)
  }
}

const createWindow = () => {
  let windowBounds = {
    width: 1440,
    height: 900,
  }

  let mappoConfig = loadMappoConfig()
  if (mappoConfig.width && mappoConfig.height) {
    console.log(`setting editor window size: ${mappoConfig.width}x${mappoConfig.height}`)
    windowBounds.width = mappoConfig.width
    windowBounds.height = mappoConfig.height
  }

  if (mappoConfig.x && mappoConfig.y) {
    console.log(`setting editor window position: ${mappoConfig.x},${mappoConfig.y}`)
    windowBounds.x = mappoConfig.x
    windowBounds.y = mappoConfig.y
  }

  win = new BrowserWindow(windowBounds)

  win.loadURL(`file://${__dirname}/index.html`)

  win.webContents.on(`devtools-opened`, win.webContents.focus)
  win.webContents.openDevTools()

  const saveEditorBounds = () => {
    const config = loadMappoConfig()
    const bounds = win.getBounds()
    console.log(`saving editor bounds: ${JSON.stringify(bounds)}`)
    config.x = bounds.x
    config.y = bounds.y
    config.width = bounds.width
    config.height = bounds.height
    saveMappoConfig(config)
  }

  win.on(`moved`, saveEditorBounds)
  win.on(`resize`, saveEditorBounds)

  win.on(`closed`, () => {
    win = null
  })
}

app.on(`ready`, createWindow)

app.on(`window-all-closed`, () => {
  if (process.platform !== `darwin`) {
    app.quit()
  }
})

app.on(`activate`, () => {
  if (win === null) {
    createWindow()
  }
})