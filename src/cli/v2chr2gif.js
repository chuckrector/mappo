"use strict"

const process = require(`process`)

const fs = require(`fs`)
const asset = require(`../asset`)
const chunk = require(`lodash/chunk`)
const animatedGif = require(`../animatedGif`)
const parseChrAnim = require(`../parseChrAnim`)

const palFilename = process.argv[2]
const chrFilename = process.argv[3]

const palData = asset.fromDisk(palFilename, asset.v1pal)
const chrData = asset.fromDisk(chrFilename, asset.v2chr)

const writeAnimatedGif = (anim, direction) => {
  const targetFilename = `${chrFilename}-${direction}.gif`
  const frameList = chunk(chrData.frames.decompressed, chrData.frameWidth * chrData.frameHeight)
  const frameDescriptorList = parseChrAnim(anim)

  fs.writeFileSync(targetFilename, animatedGif({
    palette: palData.palette.map(v => v * 4),
    raw8bitFrames: frameList,
    width: chrData.frameWidth,
    height: chrData.frameHeight,
    frameDescriptorList,
  }))

  console.log(`converted`, chrFilename, `to`, targetFilename)
}

writeAnimatedGif(chrData.downAnimationString, `down`)
writeAnimatedGif(chrData.upAnimationString, `up`)
writeAnimatedGif(chrData.rightAnimationString, `right`)
writeAnimatedGif(chrData.leftAnimationString, `left`)
