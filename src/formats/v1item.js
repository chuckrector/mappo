"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  name: T.string,
  icon: T.stringU16,
  description: T.string,
  useflag: T.stringU8,
  useeffect: T.stringU16,
  itemType: T.stringU8,
  canEquip: T.stringU8,
  equipDatIndex: T.stringU8,
  itemPreviewCode: T.stringU8,
  price: T.stringU32,
}
