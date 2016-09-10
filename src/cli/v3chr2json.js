const process = require('process')

const fs = require('fs')
const createVerge3ChrLoader = require('../loader/createVerge3ChrLoader')
const createVerge3ChrConverter = require('../converter/createVerge3ChrConverter')

const chrFilename = process.argv[2]

const diskChrData = fs.readFileSync(chrFilename)
const chrLoader = createVerge3ChrLoader({data: diskChrData})
const chrData = chrLoader.load()

const targetFilename = chrFilename + '.json'

fs.writeFileSync(targetFilename, JSON.stringify(chrData))

console.log('converted', chrFilename, 'to', targetFilename)
