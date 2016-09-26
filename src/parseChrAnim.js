"use strict"

module.exports = anim => {
  const parts = anim.toLowerCase().split(/(\S\d+)/).filter(p => !!p)
  const frameDescriptorList = []

  let currentFrameDescriptor = {}

  parts.forEach(part => {
      if (part.startsWith(`f`)) {
          currentFrameDescriptor.frameIndex = parseInt(part.substr(1), 10)
      } else if (part.startsWith(`w`)) {
          currentFrameDescriptor.delayMilliseconds = parseInt(part.substr(1) * 10)
          frameDescriptorList.push(currentFrameDescriptor)
          currentFrameDescriptor = {}
      }
  })

  return frameDescriptorList
}
