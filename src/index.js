"use strict"

// This is the Electron entry point. The chain of command is:
// Electron binary -> index.js -> index.html -> mappo.js

const electron = require(`electron`)
const {app, BrowserWindow, globalShortcut, Menu} = require(`electron`)
const fs = require(`fs`)
const loadMappoConfig = require(`./loadMappoConfig`)
const saveMappoConfig = require(`./saveMappoConfig`)
const buildApplicationMenu = require(`./buildApplicationMenu`)

let win

const createWindow = () => {
  // the desired effect being to kill the Edit menu which installs
  // keyboard shortcuts for undo/redo which interferes with (slows down)
  // cmd+z on OS X (super annoying)
  Menu.setApplicationMenu(buildApplicationMenu())

  const cfg = loadMappoConfig()
  const options = {
    width: (cfg.window && cfg.window.width) || 1440,
    height: (cfg.window && cfg.window.height) || 900,
    webPreferences: {
      nodeIntegration: true
    }
  }

  if (cfg.window && cfg.window.x) {
    options.x = cfg.window.x
  }

  if (cfg.window && cfg.window.y) {
    options.y = cfg.window.y
  }

  win = new BrowserWindow(Object.assign(options, {
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