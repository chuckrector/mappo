"use strict"

const expect = require('expect')
const createVerge3VspLoader = require('./createVerge3VspLoader')
const padEnd = require('lodash/padEnd')
const fill = require('lodash/fill')
const zlib = require('zlib')

const signature = 5264214
const version = 6
const tilesize = 16
const format = 1
const numtiles = 2
const compression = 1
const tiledatabuf = fill(Array(tilesize * tilesize * 3 * numtiles), 99)
const tiledatabufCompressed = [...zlib.deflateSync(Buffer.from(tiledatabuf))]
const numanims = 2
const anims = [
  {name: 'First', start: 0, finish: 1, delay: 2, mode: 3},
  {name: 'Second', start: 4, finish: 5, delay: 6, mode: 7},
]
const numobs = 2
const obs = fill(Array(tilesize * tilesize * numobs), 88)
const obsCompressed = [...zlib.deflateSync(Buffer.from(obs))]

const chrs = Buffer.concat([
  Buffer.from(new Uint32Array([signature, version, tilesize, format, numtiles, compression]).buffer),
  Buffer.from(new Uint32Array([tiledatabuf.length, tiledatabufCompressed.length]).buffer),
  Buffer.from(tiledatabufCompressed),
  Buffer.from(new Uint32Array([numanims]).buffer),
  Buffer.from(padEnd('First', 256, '\0')),
  Buffer.from(new Uint32Array([anims[0].start, anims[0].finish, anims[0].delay, anims[0].mode]).buffer),
  Buffer.from(padEnd('Second', 256, '\0')),
  Buffer.from(new Uint32Array([anims[1].start, anims[1].finish, anims[1].delay, anims[1].mode]).buffer),
  Buffer.from(new Uint32Array([numobs]).buffer),
  Buffer.from(new Uint32Array([obs.length, obsCompressed.length]).buffer),
  Buffer.from(obsCompressed),
])

{
  // can read chrs
  const loader = createVerge3VspLoader({
    data: Buffer.from(chrs)
  })

  const data = loader.load()

  expect(data.signature).toBe(signature)
  expect(data.version).toBe(version)
  expect(data.tilesize).toBe(tilesize)
  expect(data.format).toBe(format)
  expect(data.numtiles).toBe(numtiles)
  expect(data.compression).toBe(compression)
  expect(data.tiledatabuf.decompressed).toEqual(tiledatabuf)
  expect(data.numanims).toBe(numanims)
  expect(data.anims).toEqual(anims)
  expect(data.numobs).toBe(numobs)
  expect(data.obs.decompressed).toEqual(obs)
}
