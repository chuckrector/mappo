const process = require(`process`)

const fs = require(`fs`)
const asset = require(`../asset.js`)

const mapFilename = process.argv[2]
const mapData = asset.fromDisk(mapFilename, asset.v1map)
const targetFilename = mapFilename + `.json`

fs.writeFileSync(targetFilename, JSON.stringify(mapData))

console.log(`converted`, mapFilename, `to`, targetFilename)
