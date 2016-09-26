"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  pmultx: T.u8,
  pdivx: T.u8,
  pmulty: T.u8,
  pdivy: T.u8,
  sizex: T.u16,
  sizey: T.u16,
  trans: T.u8,
  hline: T.u8,
  padding: T.list(T.u8, 2),
}
