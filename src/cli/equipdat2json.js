const process = require('process')

const fs = require('fs')
const createVerge1EquipDatLoader = require('../loader/createVerge1EquipDatLoader')
const createVerge1EquipDatConverter = require('../converter/createVerge1EquipDatConverter')

const equipDatFilename = process.argv[2]

const diskEquipDatData = fs.readFileSync(equipDatFilename)
const equipDatLoader = createVerge1EquipDatLoader({data: diskEquipDatData})
const equipDatData = equipDatLoader.load()
const equipDatConverter = createVerge1EquipDatConverter(equipDatData)
const json = equipDatConverter.convertToJson()
const targetFilename = equipDatFilename + '.json'

fs.writeFileSync(targetFilename, json)

console.log('converted', equipDatFilename, 'to', targetFilename)
