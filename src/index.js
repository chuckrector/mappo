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
  const {editor} = mappoConfig
  if (editor) {
    if (editor.width && editor.height) {
      console.log(`setting editor window size: ${editor.width}x${editor.height}`)
      windowBounds.width = editor.width
      windowBounds.height = editor.height
    }

    if (editor.x && editor.y) {
      console.log(`setting editor window position: ${editor.x},${editor.y}`)
      windowBounds.x = editor.x
      windowBounds.y = editor.y
    }
  }

  win = new BrowserWindow(windowBounds)

  win.loadURL(`file://${__dirname}/index.html`)

  win.webContents.on(`devtools-opened`, win.webContents.focus)
  win.webContents.openDevTools()

  const saveEditorBounds = () => {
    const config = loadMappoConfig()
    const bounds = win.getBounds()
    console.log(`saving editor bounds: ${JSON.stringify(bounds)}`)
    if (!config.editor) {
      config.editor = {}
    }
    const editor = config.editor
    editor.x = bounds.x
    editor.y = bounds.y
    editor.width = bounds.width
    editor.height = bounds.height
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