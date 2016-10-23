"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  name: T.string,
  icon: T.stringU16,
  description: T.string,
  usageType: T.stringU8,
  usageEffectScriptIndex: T.stringU16,
  itemType: T.stringU8,
  canEquip: T.stringU8,
  equipDatIndex: T.stringU8,
  itemPreviewCode: T.stringU8,
  price: T.stringU32,
}
