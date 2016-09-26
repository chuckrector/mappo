"use strict"

const expect = require(`expect`)
const asset = require(`./asset`)
const filler = require(`./filler`)

{
  // asset format name is stored in result
  const buffer = Buffer.from(filler(3 * 256))
  const data = asset.fromBuffer(buffer, asset.v1pal)

  expect(data.formatName).toBe(`v1pal`)
}