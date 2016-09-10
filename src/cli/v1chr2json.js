const process = require('process')

const fs = require('fs')
const createVerge1PalLoader = require('../loader/createVerge1PalLoader')
const createVerge1ChrLoader = require('../loader/createVerge1ChrLoader')

const palFilename = process.argv[2]
const chrFilename = process.argv[3]

const diskPalData = fs.readFileSync(palFilename)
const palLoader = createVerge1PalLoader({data: diskPalData})
const palData = palLoader.load()

const diskChrData = fs.readFileSync(chrFilename)
const chrLoader = createVerge1ChrLoader({data: diskChrData})
const chrData = chrLoader.load()
chrData.palette = palData.pal

const targetFilename = chrFilename + '.json'

fs.writeFileSync(targetFilename, JSON.stringify(chrData))

console.log('converted', chrFilename, 'to', targetFilename)
