const process = require('process')

const fs = require('fs')
const createVerge1MapLoader = require('../loader/createVerge1MapLoader')
const createVerge1MapConverter = require('../converter/createVerge1MapConverter')

const mapFilename = process.argv[2]

const diskMapData = fs.readFileSync(mapFilename)
const mapLoader = createVerge1MapLoader({data: diskMapData})
const mapData = mapLoader.load()
const mapConverter = createVerge1MapConverter(mapData)
const json = mapConverter.convertToJson()
const targetFilename = mapFilename + '.json'

fs.writeFileSync(targetFilename, json)

console.log('converted', mapFilename, 'to', targetFilename)
