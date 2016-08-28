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
      Buffer.from([0, 0]),
    ])
  })

  const data = loader.load()

  expect(data.version).toBe(4)
  expect(data.vsp0name).toBe('HAHN01.VSP')
  expect(data.musname).toBe('VANGELIS.MOD')
}
