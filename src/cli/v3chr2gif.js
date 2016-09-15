const process = require('process')

const fs = require('fs')
const asset = require('../asset')
const chunk = require('lodash/chunk')
const animatedGif = require('../animatedGif')
const RgbQuant = require('rgbquant')
const colorDepth = require('../converter/colorDepth')
const flatten = require('lodash/flatten')

const chrFilename = process.argv[2]

const chrData = asset.fromDisk(chrFilename, asset.v3chr)

const convertAnimToFrameDescriptorList = anim => {
  const parts = anim.toLowerCase().split(/(\S\d+)/).filter(p => !!p)
  const frameDescriptorList = []

  let currentFrameDescriptor = {}

  parts.forEach(part => {
      if (part.startsWith('f')) {
          currentFrameDescriptor.frameIndex = parseInt(part.substr(1), 10)
      } else if (part.startsWith('w')) {
          currentFrameDescriptor.delayMilliseconds = parseInt(part.substr(1) * 10)
          frameDescriptorList.push(currentFrameDescriptor)
          currentFrameDescriptor = {}
      }
  })

  return frameDescriptorList
}

const writeAnimatedGif = (anim, index) => {
  const targetFilename = `${chrFilename}-anim${index}.gif`

  let raw32bitData = chrData.imagedata.decompressed
  if (chrData.bpp === 24) {
    raw32bitData = colorDepth.convert24to32({raw24bitData: raw32bitData})
  }

  const rgbQuant = new RgbQuant({colors: 256})

  rgbQuant.sample(raw32bitData, chrData.fxsize)

  const palette = flatten(rgbQuant.palette(true))
  const raw8bitData = rgbQuant.reduce(raw32bitData, 2/*indexed*/)
  const frameSize = chrData.fxsize * chrData.fysize
  const frameList = chunk(raw8bitData, chrData.fxsize * chrData.fysize)
  const frameDescriptorList = convertAnimToFrameDescriptorList(anim)

  fs.writeFileSync(targetFilename, animatedGif({
    palette,
    raw8bitFrames: frameList,
    width: chrData.fxsize,
    height: chrData.fysize,
    frameDescriptorList,
  }))

  console.log('converted', chrFilename, 'to', targetFilename)
}

chrData.anims.forEach((anim, index) => writeAnimatedGif(anim.animbuf, index))
