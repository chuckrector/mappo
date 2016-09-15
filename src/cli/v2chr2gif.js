const process = require('process')

const fs = require('fs')
const asset = require('../asset')
const chunk = require('lodash/chunk')
const animatedGif = require('../animatedGif')

const palFilename = process.argv[2]
const chrFilename = process.argv[3]

const palData = asset.fromDisk(palFilename, asset.v1pal)
const chrData = asset.fromDisk(chrFilename, asset.v2chr)

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

const writeAnimatedGif = (anim, direction) => {
  const targetFilename = `${chrFilename}-${direction}.gif`
  const frameList = chunk(chrData.imagedata.decompressed, chrData.fxsize * chrData.fysize)
  const frameDescriptorList = convertAnimToFrameDescriptorList(anim)

  fs.writeFileSync(targetFilename, animatedGif({
    palette: palData.pal.map(v => v * 4),
    raw8bitFrames: frameList,
    width: chrData.fxsize,
    height: chrData.fysize,
    frameDescriptorList,
  }))

  console.log('converted', chrFilename, 'to', targetFilename)
}

writeAnimatedGif(chrData.danim, 'down')
writeAnimatedGif(chrData.uanim, 'up')
writeAnimatedGif(chrData.ranim, 'right')
writeAnimatedGif(chrData.lanim, 'left')
