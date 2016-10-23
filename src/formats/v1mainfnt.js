"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  images: T.list(T.u8, 9 * 16 * 95)
}