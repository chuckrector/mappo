"use strict"

const expect = require('expect')
const detectFormat = require('./detectFormat')

{
    // can detect v1 BOX.RAW
    const isBoxRaw = new Buffer(320 * 66)
    const isNotBoxRaw = new Buffer(1)

    expect(detectFormat(isBoxRaw)).toBe('v1boxraw')
    expect(detectFormat(isNotBoxRaw)).toBe('unknown')
}