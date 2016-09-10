const process = require('process')

const fs = require('fs')
const V1_MAP = require('../formats/v1map')
const {readFormatData} = require('../readFormat')

const mapFilename = process.argv[2]

const diskMapData = fs.readFileSync(mapFilename)
const mapData = readFormatData({format: V1_MAP, data: diskMapData})
const targetFilename = mapFilename + '.json'

fs.writeFileSync(targetFilename, JSON.stringify(mapData))

console.log('converted', mapFilename, 'to', targetFilename)
