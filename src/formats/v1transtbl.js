"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  transparencyTable: T.list(T.u8, 256 * 256)
}