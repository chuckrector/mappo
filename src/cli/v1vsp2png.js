const process = require(`process`)

const fs = require(`fs`)
const createVerge1VspConverter = require(`../converter/createVerge1VspConverter`)
const asset = require(`../asset`)

const vspFilename = process.argv[2]
const vsp = asset.fromDisk(vspFilename, asset.v1vsp)
const converter = createVerge1VspConverter(vsp)
const png = converter.convertToPng()
const targetFilename = vspFilename + `.png`

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log(`converted`, vspFilename, `to`, targetFilename)
