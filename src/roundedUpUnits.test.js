"use strict"

const expect = require(`expect`)
const roundedUpUnits = require(`./roundedUpUnits`)

{
  // can round up multiples
  expect(roundedUpUnits(320, 16)).toBe(20)
  expect(roundedUpUnits(321, 16)).toBe(21)
  expect(roundedUpUnits(1024, 2)).toBe(512)
}
