"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  parallax: {
    x: {
      mul: T.u8,
      div: T.u8,
    },
    y: {
      mul: T.u8,
      div: T.u8,
    },
  },
  sizex: T.u16,
  sizey: T.u16,
  trans: T.u8,
  hline: T.u8,
  padding: T.list(T.u8, 2),
}
