const process = require('process')

const fs = require('fs')
const createVerge1ItemsDatLoader = require('../loader/createVerge1ItemsDatLoader')

const itemsDatFilename = process.argv[2]

const diskItemsDatData = fs.readFileSync(itemsDatFilename)
const itemsDatLoader = createVerge1ItemsDatLoader({data: diskItemsDatData})
const itemsDatData = itemsDatLoader.load()
const targetFilename = itemsDatFilename + '.json'

fs.writeFileSync(targetFilename, JSON.stringify(itemsDatData))

console.log('converted', itemsDatFilename, 'to', targetFilename)
