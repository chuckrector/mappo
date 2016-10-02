"use strict"

const expect = require(`expect`)
const createBufferReader = require(`./createBufferReader.js`)
const filler = require(`./filler`)
const zlib = require(`zlib`)
const {makeBuffer, B} = require(`./makeBuffer`)

{
  // empty buffer is at end
  const reader = createBufferReader({
    data: Buffer.from(``)
  })

  expect(reader.atEnd()).toBe(true)
}

{
  // at end after whitespace
  const reader = createBufferReader({
    data: Buffer.from(` `)
  })

  expect(reader.atEnd()).toBe(false)
  reader.readWhitespace()
  expect(reader.atEnd()).toBe(true)
}

{
  // at end after string
  const reader = createBufferReader({
    data: Buffer.from(`This`)
  })

  expect(reader.atEnd()).toBe(false)
  reader.readString()
  expect(reader.atEnd()).toBe(true)
}

{
  // can read bytes
  const reader = createBufferReader({
    data: Buffer.from([3, 2, 1])
  })

  expect(reader.readByte()).toBe(3)
  expect(reader.readByte()).toBe(2)
  expect(reader.readByte()).toBe(1)
}

{
  // can read byte array
  const reader = createBufferReader({
    data: Buffer.from([3, 2, 1])
  })

  expect(reader.readByteArray(3)).toEqual([3, 2, 1])
}

const wordArray = [65535, 1, 256]

{
  // can read words
  const reader = createBufferReader({
    data: B.u16(wordArray)
  })

  expect(reader.readWord()).toBe(65535)
  expect(reader.readWord()).toBe(1)
  expect(reader.readWord()).toBe(256)
}

{
  // can read word array
  const reader = createBufferReader({
    data: B.u16(wordArray)
  })

  expect(reader.readWordArray(3)).toEqual(wordArray)
}

const quadArray = [90000, 1, 65536]

{
  // can read quads
  const reader = createBufferReader({
    data: B.u32(quadArray)
  })

  expect(reader.readQuad()).toBe(90000)
  expect(reader.readQuad()).toBe(1)
  expect(reader.readQuad()).toBe(65536)
}

{
  // can read quad array
  const reader = createBufferReader({
    data: B.u32(quadArray)
  })

  expect(reader.readQuadArray(3)).toEqual(quadArray)
}

const doubleArray = [1, 1.5, -1, -1.5, 0.003, 0]

{
  // can read doubles
  const reader = createBufferReader({
    data: B.f64(doubleArray)
  })

  expect(reader.readDouble()).toBe(1)
  expect(reader.readDouble()).toBe(1.5)
  expect(reader.readDouble()).toBe(-1)
  expect(reader.readDouble()).toBe(-1.5)
  expect(reader.readDouble()).toBe(0.003)
  expect(reader.readDouble()).toBe(0)
}

{
  // can read double array
  const reader = createBufferReader({
    data: B.f64([1, 1.5, -1, -1.5, 0.003, 0])
  })

  expect(reader.readDoubleArray(doubleArray.length)).toEqual(doubleArray)
}

{
  // can read strings
  const reader = createBufferReader({
    data: Buffer.from(`tic tac toe`)
  })

  expect(reader.readStringFixed(3)).toBe(`tic`)
  expect(reader.readStringFixed(5)).toBe(` tac `)
  expect(reader.readStringFixed(3)).toBe(`toe`)
}

{
  // can read length-encoded strings
  const cuteCuddlyKitten = 'Cute Cuddly Kitten'
  const reader = createBufferReader({
    data: makeBuffer([
      B.u32(cuteCuddlyKitten.length),
      Buffer.from(cuteCuddlyKitten),
    ])
  })

  expect(reader.readStringLengthEncoded()).toBe(cuteCuddlyKitten)
}

{
  // can read null terminated strings
  const reader = createBufferReader({
    data: Buffer.from(`Cute\0Cuddly\0Kittens`)
  })

  expect(reader.readStringNullTerminated()).toBe(`Cute`)
  expect(reader.readStringNullTerminated()).toBe(`Cuddly`)
  expect(() => reader.readStringNullTerminated()).toThrow(RangeError)
}

{
  // reading a string should ignore garbage after null terminator
  const reader = createBufferReader({
    data: Buffer.from(`HAHN01.VSP\0he`)
  })

  expect(reader.readStringFixed(13)).toBe(`HAHN01.VSP`)
}

{
  // can get length
  const reader = createBufferReader({
    data: Buffer.from(filler(13, 0))
  })

  expect(reader.length).toBe(13)
}

{
  let data = filler(13, 99)
  data[data.length - 1] = 88

  // can set position
  const reader = createBufferReader({
    data: Buffer.from(data)
  })

  reader.position = data.length - 1
  expect(reader.readByte()).toBe(88)
}

{
  // can read whitespace
  const reader = createBufferReader({
    data: Buffer.from(` \n\r\tThis n that`)
  })

  expect(reader.readWhitespace()).toBe(` \n\r\t`)
}

{
  // can read whitespace at end of data
  const reader = createBufferReader({
    data: Buffer.from(` \n\r\t`)
  })

  expect(reader.readWhitespace()).toBe(` \n\r\t`)
}

{
  // can read variable length string up to space
  const reader = createBufferReader({
    data: Buffer.from(`This n that`)
  })

  expect(reader.readString()).toBe(`This`)
  expect(reader.readString()).toBe(`n`)
  expect(reader.readString()).toBe(`that`)
}

{
  // can read variable length string as byte
  const doubleNegMax = -256 * 2
  const reader = createBufferReader({
    data: Buffer.from(`255 256 -1 ` + doubleNegMax)
  })

  expect(reader.readStringAsByte()).toBe(255)
  expect(reader.readStringAsByte()).toBe(0)
  expect(reader.readStringAsByte()).toBe(255)
  expect(reader.readStringAsByte()).toBe(0)
}

{
  // can read variable length string as word
  const doubleNegMax = -65536 * 2
  const reader = createBufferReader({
    data: Buffer.from(`65535 65536 -1 ` + doubleNegMax)
  })

  expect(reader.readStringAsWord()).toBe(65535)
  expect(reader.readStringAsWord()).toBe(0)
  expect(reader.readStringAsWord()).toBe(65535)
}

{
  // can read variable length string as quad
  const doubleNegMax = -4294967296 * 2
  const reader = createBufferReader({
    data: Buffer.from(`4294967295 4294967296 -1 ` + doubleNegMax)
  })

  expect(reader.readStringAsQuad()).toBe(4294967295)
  expect(reader.readStringAsQuad()).toBe(0)
  expect(reader.readStringAsQuad()).toBe(4294967295)
  expect(reader.readStringAsQuad()).toBe(0)
}

{
  // can read line to end of data
  const reader = createBufferReader({
    data: Buffer.from(`Attention:`)
  })

  expect(reader.readLine()).toBe(`Attention:`)
}

{
  // can read line to newline
  const reader = createBufferReader({
    data: Buffer.from(`Attention:\nBacon`)
  })

  expect(reader.readLine()).toBe(`Attention:`)
}

{
  // can read line to carriage return
  const reader = createBufferReader({
    data: Buffer.from(`Attention:\rBacon`)
  })

  expect(reader.readLine()).toBe(`Attention:`)
}

{
  // can read empty line
  const reader = createBufferReader({
    data: Buffer.from(`\nBacon`)
  })

  expect(reader.readLine()).toBe(``)
}

{
  // at match
  const reader = createBufferReader({
    data: Buffer.from(`// Attention: Bacon`)
  })

  expect(reader.atMatch(`?`)).toBe(false)
  expect(reader.atMatch(`/`)).toBe(true)
  expect(reader.atMatch(`//`)).toBe(true)
  expect(reader.atMatch(`// Attention:`)).toBe(true)
  expect(reader.atMatch(`// Attention: Bacon`)).toBe(true)
  expect(reader.atMatch(`// Attention: Bacon Bits`)).toBe(false)
}

{
  // can read compressed word array
  const buffer = makeBuffer([
    B.u32([4 * 2]),
    B.u16([1, ((16 * 16) - 2) | 0xff00, 2, 3]),
  ])
  const reader = createBufferReader({
    data: buffer
  })

  let decompressedLayout = filler(16 * 16, 2)
  decompressedLayout[0] = 1
  decompressedLayout[255] = 3

  const data = reader.readWordArrayCompressed(16 * 16)
  expect(data.bufsize).toEqual(4 * 2)
  expect(data.decompressed).toEqual(decompressedLayout)
}

{
  // can read compressed byte array
  const buffer = makeBuffer([
    B.u32(5),
    B.u8([1, 0xff, ((16 * 16) - 2), 2, 3]),
  ])
  const reader = createBufferReader({
    data: buffer
  })

  let decompressedLayout = filler(16 * 16, 2)
  decompressedLayout[0] = 1
  decompressedLayout[255] = 3

  const data = reader.readByteArrayCompressed(16 * 16)
  expect(data.bufsize).toEqual(5)
  expect(data.decompressed).toEqual(decompressedLayout)
}

{
  // can get remaining # bytes
  const reader = createBufferReader({
    data: Buffer.from([1, 2])
  })

  expect(reader.remaining).toBe(2)
  reader.readByte()
  expect(reader.remaining).toBe(1)
  reader.readByte()
  expect(reader.remaining).toBe(0)
}

{
  // can read zlibU8 buffers
  const raw = filler(16 * 16, 99)
  const compressedBuffer = zlib.deflateSync(B.u8(raw))
  const buffer = makeBuffer([
    B.u32([raw.length, compressedBuffer.length]),
    compressedBuffer
  ])
  const reader = createBufferReader({data: buffer})
  const data = reader.readZlibU8(16 * 16)

  expect(data.mysize).toBe(raw.length)
  expect(data.comprLen).toBe(compressedBuffer.length)
  expect(data.compressed.length).toBe(compressedBuffer.length)
  expect(data.compressed).toEqual(Array.from(compressedBuffer))
  expect(data.decompressed.length).toBe(raw.length)
  expect(data.decompressed).toEqual(raw)
}

{
  // can read zlibU16 buffers
  const raw = filler(16 * 16, 0xbeef)
  const compressedBuffer = zlib.deflateSync(B.u16(raw))
  const buffer = makeBuffer([
    B.u32([raw.length * 2, compressedBuffer.length]),
    compressedBuffer
  ])
  const reader = createBufferReader({data: buffer})
  const data = reader.readZlibU16(16 * 16)

  expect(data.mysize).toBe(raw.length * 2)
  expect(data.comprLen).toBe(compressedBuffer.length)
  expect(data.compressed.length).toBe(compressedBuffer.length)
  expect(data.compressed).toEqual(Array.from(compressedBuffer))
  expect(data.decompressed.length).toBe(raw.length)
  expect(data.decompressed).toEqual(raw)
}

{
  // can read ika zlibU8 buffers
  const raw = filler(16 * 16, 99)
  const compressedBuffer = zlib.deflateSync(B.u8(raw))
  const buffer = makeBuffer([
    B.u32(compressedBuffer.length),
    compressedBuffer
  ])
  const reader = createBufferReader({data: buffer})
  const data = reader.readIkaZlibU8(16 * 16)

  expect(data.comprLen).toBe(compressedBuffer.length)
  expect(data.compressed.length).toBe(compressedBuffer.length)
  expect(data.compressed).toEqual(Array.from(compressedBuffer))
  expect(data.decompressed.length).toBe(raw.length)
  expect(data.decompressed).toEqual(raw)
}

{
  // can read ika zlibU32 buffers
  const raw = filler(16 * 16, 0xbeef)
  const compressedBuffer = zlib.deflateSync(B.u32(raw))
  const buffer = makeBuffer([
    B.u32(compressedBuffer.length),
    compressedBuffer
  ])
  const reader = createBufferReader({data: buffer})
  const data = reader.readIkaZlibU32(16 * 16)

  expect(data.comprLen).toBe(compressedBuffer.length)
  expect(data.compressed.length).toBe(compressedBuffer.length)
  expect(data.compressed).toEqual(Array.from(compressedBuffer))
  expect(data.decompressed.length).toBe(raw.length)
  expect(data.decompressed).toEqual(raw)
}

{
  // throw on zlibU8 size mismatch
  const reader = createBufferReader({
    data: B.u32(16 * 16 * 3),
  })

  expect(() => {
    reader.readZlibU8(16 * 16)
  }).toThrow(`expected an uncompressed byte length of 256 but got 768`)
}

{
  // throw on zlibU16 size mismatch
  const howManyWords = 3
  const reader = createBufferReader({
    data: B.u32((howManyWords * 2) + 1),
  })

  expect(() => {
    reader.readZlibU16(howManyWords)
  }).toThrow(`expected an uncompressed byte length of 6 but got 7`)
}