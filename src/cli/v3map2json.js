const process = require('process')

const fs = require('fs')
const createVerge3MapLoader = require('../loader/createVerge3MapLoader')
const createVerge3MapConverter = require('../converter/createVerge3MapConverter')

const mapFilename = process.argv[2]

const diskMapData = fs.readFileSync(mapFilename)
const mapLoader = createVerge3MapLoader({data: diskMapData})
const mapData = mapLoader.load()
const mapConverter = createVerge3MapConverter(mapData)
const json = mapConverter.convertToJson()
const targetFilename = mapFilename + '.json'

fs.writeFileSync(targetFilename, json)

console.log('converted', mapFilename, 'to', targetFilename)
