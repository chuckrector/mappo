"use strict"

const process = require(`process`)
const fs = require(`fs`)
const asset = require(`../asset`)
const chunk = require(`lodash/chunk`)
const animatedGif = require(`../animatedGif`)
const RgbQuant = require(`rgbquant`)
const colorDepth = require(`../converter/colorDepth`)
const flatten = require(`lodash/flatten`)
const parseChrAnim = require(`../parseChrAnim`)

const palFilename = process.argv[2]
const chrFilename = process.argv[3]

const palData = asset.fromDisk(chrFilename, asset.v1pal)
const chrData = asset.fromDisk(chrFilename, asset.v2kjchr)

const writeAnimatedGif = (anim, direction) => {
  const targetFilename = `${chrFilename}-${direction}.gif`

  const raw16bitData = chrData.frames.decompressed
  const raw32bitData = colorDepth.convert16to32({raw16bitData})

  const palette = palData.palette
  const paletteTriplets = chunk(palette, 3)
  const rgbQuant = new RgbQuant({palette: paletteTriplets})

  rgbQuant.sample(raw32bitData, chrData.frameWidth)

  const raw8bitData = rgbQuant.reduce(raw32bitData, 2/*indexed*/)
  const frameList = chunk(raw8bitData, chrData.frameWidth * chrData.frameHeight)
  const frameDescriptorList = parseChrAnim(anim)

  fs.writeFileSync(targetFilename, animatedGif({
    palette,
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