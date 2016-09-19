"use strict"

// This is the Electron entry point. The chain of command is:
// Electron binary -> index.js -> index.html -> mappo.js

const {app, BrowserWindow} = require('electron')

let win

const createWindow = () => {
  win = new BrowserWindow({
    width: 1400,
    height: 768,
  })

  win.loadURL(`file://${__dirname}/index.html`)

  win.webContents.on('devtools-opened', win.webContents.focus)
  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})