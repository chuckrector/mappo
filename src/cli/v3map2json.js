const process = require('process')

const fs = require('fs')
const createVerge3MapLoader = require('../loader/createVerge3MapLoader')

const mapFilename = process.argv[2]

const diskMapData = fs.readFileSync(mapFilename)
const mapLoader = createVerge3MapLoader({data: diskMapData})
const mapData = mapLoader.load()
const targetFilename = mapFilename + '.json'

fs.writeFileSync(targetFilename, JSON.stringify(mapData))

console.log('converted', mapFilename, 'to', targetFilename)