"use strict"

// This is the Electron entry point. The chain of command is:
// Electron binary -> index.js -> index.html -> mappo.js

const {app, BrowserWindow} = require(`electron`)
const fs = require(`fs`)

let win

const createWindow = () => {
  let mappoConfigText
  let mappoConfig = {}
  let windowSize = {
    width: 1440,
    height: 900,
  }

  try {
    mappoConfigText = fs.readFileSync(`mappo.json`)

    try {
      mappoConfig = JSON.parse(mappoConfigText)
    } catch (exc) {
      console.log(`bad config file, using defaults. [error: ${exc.message}]`)
    }

    if (mappoConfig.width && mappoConfig.height) {
      console.log(`setting editor window size to`, mappoConfig.windowSize)
      windowSize = {
        width: mappoConfig.width,
        height: mappoConfig.height,
      }
    }
  } catch (exc) {
    console.log(`no mappo.json found, using defaults. [error: ${exc.message}]`)
  }

  win = new BrowserWindow(windowSize)

  win.loadURL(`file://${__dirname}/index.html`)

  win.webContents.on(`devtools-opened`, win.webContents.focus)
  win.webContents.openDevTools()

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