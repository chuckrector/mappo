const process = require(`process`)

const fs = require(`fs`)
const createVerge1EquipDatLoader = require(`../loader/createVerge1EquipDatLoader`)

const equipDatFilename = process.argv[2]

const diskEquipDatData = fs.readFileSync(equipDatFilename)
const equipDatLoader = createVerge1EquipDatLoader({data: diskEquipDatData})
const equipDatData = equipDatLoader.load()
const targetFilename = equipDatFilename + `.json`

fs.writeFileSync(targetFilename, JSON.stringify(equipDatData))

console.log(`converted`, equipDatFilename, `to`, targetFilename)
