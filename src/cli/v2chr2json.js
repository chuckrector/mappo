const process = require('process')

const fs = require('fs')
const createVerge2ChrLoader = require('../loader/createVerge2ChrLoader')
const asset = require('../asset')

const palFilename = process.argv[2]
const chrFilename = process.argv[3]

const palData = asset.fromDisk(palFilename, asset.v1pal)

const diskChrData = fs.readFileSync(chrFilename)
const chrLoader = createVerge2ChrLoader({data: diskChrData})
const chrData = chrLoader.load()
chrData.palette = palData.pal

const targetFilename = chrFilename + '.json'

fs.writeFileSync(targetFilename, JSON.stringify(chrData))

console.log('converted', chrFilename, 'to', targetFilename)
