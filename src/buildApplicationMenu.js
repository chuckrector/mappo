"use strict"

const {Menu} = require(`electron`)

const reload = {
  label: `Reload`,
  accelerator: `CmdOrCtrl+R`,
  click (item, focusedWindow) {
    if (focusedWindow) focusedWindow.reload()
  }
}

const toggleDeveloperTools = {
  label: `Toggle Developer Tools`,
  accelerator: process.platform === `darwin` ? `Alt+Command+I` : `Ctrl+Shift+I`,
  click (item, focusedWindow) {
    if (focusedWindow) focusedWindow.webContents.toggleDevTools()
  }
}

const template = [{
  label: `View`,
  submenu: [
    reload,
    toggleDeveloperTools,
  ]
}, {
  role: `help`,
  submenu: [{
    label: `mappo on GitHub`,
    click () {
      require(`electron`).shell.openExternal(`https://github.com/chuckrector/mappo`)
    }
  }]
}]

module.exports = () => Menu.buildFromTemplate(template)