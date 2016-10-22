"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  name: T.string,
  icon: T.stringU16,
  description: T.string,
  useflag: T.stringU8,
  useeffect: T.stringU16,
  itemtype: T.stringU8,
  equipflag: T.stringU8,
  equipidx: T.stringU8,
  itmprv: T.stringU8,
  price: T.stringU32,
}
