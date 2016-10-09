"use strict"

// This is the Electron entry point. The chain of command is:
// Electron binary -> index.js -> index.html -> mappo.js

const electron = require(`electron`)
const {app, BrowserWindow} = require(`electron`)
const fs = require(`fs`)
const loadMappoConfig = require(`./loadMappoConfig`)
const saveMappoConfig = require(`./saveMappoConfig`)

let win

const createWindow = () => {
  let windowBounds = {
    width: 1440,
    height: 900,
  }

  let mappoConfig = loadMappoConfig()
  const {ui} = mappoConfig
  if (ui) {
    if (ui.windowSize && ui.windowSize.width && ui.windowSize.height) {
      console.log(`setting editor window size: ${ui.windowSize.width}x${ui.windowSize.height}`)
      windowBounds.width = ui.windowSize.width
      windowBounds.height = ui.windowSize.height
    }

    if (ui.windowPosition && ui.windowPosition.x && ui.windowPosition.y) {
      console.log(`setting editor window position: ${ui.windowPosition.x},${ui.windowPosition.y}`)
      windowBounds.x = ui.windowPosition.x
      windowBounds.y = ui.windowPosition.y
    }
  }

  win = new BrowserWindow(Object.assign(windowBounds, {
    backgroundColor: '#444a53',
  }))

  win.loadURL(`file://${__dirname}/index.html`)

  const sendWindowBounds = () => {
    // sent to renderer process (mappo.js)
    win.webContents.send(`windowBounds`, win.getBounds())
  }

  win.webContents.on(`devtools-opened`, win.webContents.focus)
  win.webContents.on(`dom-ready`, () => {
    sendWindowBounds()
  })
  win.webContents.openDevTools()

  win.on(`moved`, sendWindowBounds)
  win.on(`resize`, sendWindowBounds)

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