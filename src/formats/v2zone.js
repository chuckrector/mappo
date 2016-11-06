"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  name: T.stringFixed(40),
  script: T.u16,
  percent: T.u16,
  delay: T.u16,
  acceptAdjacentActivation: T.u16,
  entityscript: T.u16,
}
