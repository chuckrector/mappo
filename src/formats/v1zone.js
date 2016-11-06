"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  zonename: T.stringFixed(15),
  zonenamePadding: T.u8,
  callevent: T.u16,
  percent: T.u8,
  delay: T.u8,
  acceptAdjacentActivation: T.u8,
  saveDescription: T.stringFixed(30),
  saveDescriptionPadding: T.u8,
}