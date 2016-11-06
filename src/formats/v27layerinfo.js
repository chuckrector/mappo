"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  parallax: {
    x: {
      mul: T.u32,
      div: T.u32,
    },
    y: {
      mul: T.u32,
      div: T.u32,
    }
  }
}
