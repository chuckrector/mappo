"use strict"

const lzw = require('./lzw')

const delayMilliseconds = 100

// assumes 0 is always transparency index
const animatedGif = ({
  palette,
  raw8bitFrames,
  width,
  height,
  loopCount=0,
  transparentIndex=0,
  isTransparent=true,
  disposalCode=2,
}) => {
  let output = new Buffer(768 + (width * height * raw8bitFrames.length))
  let outputOffset = 0

  const byteMe = word => [word & 0xff, (word >> 8) & 0xff]
  const writeString = string => { output.write(string, outputOffset), outputOffset += string.length }
  const writeByte = byte => output.writeUInt8(byte, outputOffset++)
  const writeByteArray = bytes => bytes.forEach(byte => writeByte(byte))
  const writeWord = word => { output.writeUInt16LE(word, outputOffset), outputOffset += 2 }

  writeString('GIF89a')
  writeWord(width)
  writeWord(height)
  writeByteArray([0xf7, 0, 0])
  writeByteArray(palette)
  writeByteArray([0x21, 0xff, 11])
  writeString('NETSCAPE2.0')
  writeByteArray([3, 1, loopCount, 0, 0])

  raw8bitFrames.forEach(data => {
    writeByteArray([0x21, 0xf9, 4])
    writeByte((disposalCode << 2) | ~~isTransparent)
    writeWord(Math.round(delayMilliseconds / 10))
    writeByteArray([transparentIndex, 0])
    writeByteArray([0x2c, 0, 0, 0, 0])
    writeWord(width)
    writeWord(height)
    writeByte(0)
    lzw({data, writeByte, writeByteArray})
  })

  writeByte(0x3b)

  return output.slice(0, outputOffset)
}

module.exports = animatedGif