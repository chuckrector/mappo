"use strict"

const process = require(`process`)
const fs = require(`fs`)
const asset = require(`../asset`)
const chunk = require(`lodash/chunk`)
const animatedGif = require(`../animatedGif`)

const palFilename = process.argv[2]
const chrFilename = process.argv[3]
const palData = asset.fromDisk(palFilename, asset.v1pal)
const chrData = asset.fromDisk(chrFilename, asset.v1chr)
const tileList = chunk(chrData.frames, 16 * 32)

const writeAnimatedGif = (frameOffset, direction) => {
  const targetFilename = `${chrFilename}-${direction}.gif`

  fs.writeFileSync(targetFilename, animatedGif({
    palette: palData.palette.map(v => v * 4),
    raw8bitFrames: [0, 1, 2, 1, 3, 4, 3].map(index => tileList[frameOffset + index]),
    width: 16,
    height: 32,
  }))

  console.log(`converted`, chrFilename, `to`, targetFilename)
}

writeAnimatedGif(5*0, `down`)
writeAnimatedGif(5*1, `up`)
writeAnimatedGif(5*2, `right`)
writeAnimatedGif(5*3, `left`)
