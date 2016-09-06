const process = require('process')

const fs = require('fs')
const createVerge1ItemsDatLoader = require('../loader/createVerge1ItemsDatLoader')
const createVerge1ItemsDatConverter = require('../converter/createVerge1ItemsDatConverter')

const itemsDatFilename = process.argv[2]

const diskItemsDatData = fs.readFileSync(itemsDatFilename)
const itemsDatLoader = createVerge1ItemsDatLoader({data: diskItemsDatData})
const itemsDatData = itemsDatLoader.load()
const itemsDatConverter = createVerge1ItemsDatConverter(itemsDatData)
const json = itemsDatConverter.convertToJson()
const targetFilename = itemsDatFilename + '.json'

fs.writeFileSync(targetFilename, json)

console.log('converted', itemsDatFilename, 'to', targetFilename)
