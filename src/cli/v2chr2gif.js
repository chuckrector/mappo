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
  const frameList = chunk(chrData.imagedata.decompressed, chrData.fxsize * chrData.fysize)
  const frameDescriptorList = parseChrAnim(anim)

  fs.writeFileSync(targetFilename, animatedGif({
    palette: palData.pal.map(v => v * 4),
    raw8bitFrames: frameList,
    width: chrData.fxsize,
    height: chrData.fysize,
    frameDescriptorList,
  }))

  console.log(`converted`, chrFilename, `to`, targetFilename)
}

writeAnimatedGif(chrData.danim, `down`)
writeAnimatedGif(chrData.uanim, `up`)
writeAnimatedGif(chrData.ranim, `right`)
writeAnimatedGif(chrData.lanim, `left`)
