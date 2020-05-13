"use strict"

const process = require(`process`)

const fs = require(`fs`)
const createTileGridConverter = require(`../converter/createTileGridConverter`)
const asset = require(`../asset`)
const zlib = require(`zlib`)

const vspFilename = process.argv[2]
const vsp = asset.fromDisk(vspFilename, asset.ikavsp_v6)
console.log(`${vsp.tileCount} tiles, ${vsp.tileWidth}x${vsp.tileHeight}`)

const zlibBuffer = Buffer.from(vsp.tileBuffer)
const zlibDataDecompressed = [...zlib.inflateSync(zlibBuffer, {finishFlush: zlib.Z_SYNC_FLUSH})]
const converter = createTileGridConverter({
    tileWidth: vsp.tileWidth,
    tileHeight: vsp.tileHeight,
    columns: 6,
    tileCount: vsp.tileCount,
    raw32bitData: zlibDataDecompressed,
})

const png = converter.convertToPng()
const targetFilename = vspFilename + `.png`

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log(`converted`, vspFilename, `to`, targetFilename)
