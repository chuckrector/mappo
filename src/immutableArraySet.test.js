"use strict"

const expect = require(`expect`)
const immutableArraySet = require(`./immutableArraySet`)

{
  // does not mutate array
  const array = [1, 2, 3]
  const result = immutableArraySet({array, index: 1, newValue: 3})
  expect(result).not.toBe(array)
  expect(result).toEqual([1, 3, 3])
}
