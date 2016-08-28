"use strict"

console.log('running tests:', __filename)

const expect = require('expect')
const createVerge1MapLoader = require('./createVerge1MapLoader.js')
const padEnd = require('lodash/padEnd')

{
  // can load header
  const loader = createVerge1MapLoader({
    data: Buffer.concat([
      Buffer.from([4]),
      Buffer.from(padEnd('HAHN01.VSP', 13, '\0')),
      Buffer.from(padEnd('VANGELIS.MOD', 13, '\0')),
      Buffer.from([0, 1, 1]),
      Buffer.from(padEnd('Village - Past', 30, '\0')),
      Buffer.from([1, 0]),
      Buffer.from(new Uint16Array([21, 1]).buffer),
      Buffer.from([1, 1]),
      Buffer.from(new Uint16Array([100, 200]).buffer),
      Buffer.from([0]),
    ])
  })

  const data = loader.load()

  expect(data.version).toBe(4)
  expect(data.vsp0name).toBe('HAHN01.VSP')
  expect(data.musname).toBe('VANGELIS.MOD')
  expect(data.layerc).toBe(0)
  expect(data.pmultx).toBe(1)
  expect(data.pdivx).toBe(1)
  expect(data.levelname).toBe('Village - Past')
  expect(data.showname).toBe(1)
  expect(data.saveflag).toBe(0)
  expect(data.startx).toBe(21)
  expect(data.starty).toBe(1)
  expect(data.hide).toBe(1)
  expect(data.warp).toBe(1)
  expect(data.xsize).toBe(100)
  expect(data.ysize).toBe(200)
  expect(data.b).toBe(0)
}
