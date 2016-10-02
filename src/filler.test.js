"use strict"

const expect = require(`expect`)
const filler = require(`./filler`)

{
  // fills with zero by default
  expect(filler(3)).toEqual([0, 0, 0])
}

{
  // can fill with custom
  const foo = {foo: `bar`}
  expect(filler(3, 99)).toEqual([99, 99, 99])
  expect(filler(3, foo)).toEqual([foo, foo, foo])
}
