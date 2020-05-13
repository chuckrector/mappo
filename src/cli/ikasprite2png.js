"use strict"

const process = require(`process`)
const fs = require(`fs`)
const createBufferReader = require(`../createBufferReader`)
const zlib = require(`zlib`)
const createTileGridConverter = require(`../converter/createTileGridConverter`)
// const colorDepth = require(`./colorDepth`)

//const createVerge3VspConverter = require(`../converter/createVerge3VspConverter`)
//const asset = require(`../asset`)

const spriteFilename = process.argv[2]
const data = fs.readFileSync(spriteFilename)
const reader = createBufferReader({data})
let tileCount = 0
let tileWidth = 0
let tileHeight = 0
let lines = reader.readLines()
let i
for (i = 0; i < lines.length; i++) {
    let line = lines[i];

    let matchCount = /count (\d+)/.exec(line)
    if (matchCount) {
        tileCount = +matchCount[1]
        continue
    }

    let matchWidth = /width (\d+)/.exec(line)
    if (matchWidth && !tileWidth) {
        tileWidth = +matchWidth[1]
        continue
    }

    let matchHeight = /height (\d+)/.exec(line)
    if (matchHeight && !tileHeight) {
        tileHeight = +matchHeight[1]
        continue
    }

    let matchZlib = /format zlib/.exec(line)
    if (matchZlib) {
        i++
        break
    }
}

let zlibBase64 = lines[i++].trim()
for (; i < lines.length; i++) {
    let line = lines[i]
    let matchTab = /\t/.exec(line)
    if (matchTab) break
    zlibBase64 += line
}
const zlibBuffer = Buffer.from(zlibBase64, 'base64')
const zlibDataDecompressed = [...zlib.inflateSync(zlibBuffer, {finishFlush: zlib.Z_SYNC_FLUSH})]
//console.log(`Decompressed zlib data length: ${zlibDataDecompressed.length}`)

const converter = createTileGridConverter({
    tileWidth,
    tileHeight,
    columns: 9,
    tileCount,
    raw32bitData: zlibDataDecompressed,
})

console.log(`${tileCount} tiles, ${tileWidth}x${tileHeight}`)
// const vsp = asset.fromDisk(vspFilename, asset.v3vsp)
// const converter = createVerge3VspConverter({
//   tileCount: vsp.tileCount,
//   tiles: vsp.tiles.decompressed,
// })
const png = converter.convertToPng()
const targetFilename = spriteFilename + `.png`

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log(`converted`, spriteFilename, `to`, targetFilename)
