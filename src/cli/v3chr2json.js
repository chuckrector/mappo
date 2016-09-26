const process = require(`process`)

const fs = require(`fs`)
const createVerge3ChrConverter = require(`../converter/createVerge3ChrConverter`)
const asset = require(`../asset`)

const chrFilename = process.argv[2]
const chrData = asset.fromDisk(chrFilename, asset.v3chr)
const targetFilename = chrFilename + `.json`

fs.writeFileSync(targetFilename, JSON.stringify(chrData))

console.log(`converted`, chrFilename, `to`, targetFilename)
