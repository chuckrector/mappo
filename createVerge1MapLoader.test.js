"use strict"

console.log('running tests:', __filename)

const expect = require('expect')
const createVerge1MapLoader = require('./createVerge1MapLoader.js')

{
  // can load header
  const loader = createVerge1MapLoader({
    data: Buffer.from([4])
  })

  const data = loader.load()

  expect(data.version).toBe(4)
}
