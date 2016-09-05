"use strict"

const createDataReader = require('../createDataReader')
const {readFormat, T} = require('../readFormat')

module.exports = (args) => {
  const reader = createDataReader(args)

  const V1_ITEM = {
    name: T.string,
    icon: T.stringU16,
    desc: T.string,
    useflag: T.stringU8,
    useeffect: T.stringU16,
    itemtype: T.stringU8,
    equipflag: T.stringU8,
    equipidx: T.stringU8,
    itmprv: T.stringU8,
    price: T.stringU32,
  }

  const V1_ITEMS_DAT = {
    _: T.whitespace,
    numitems: T.stringU8,
    items: T.list(V1_ITEM, ({record}) => record.numitems),
  }

  return {
    load: () => readFormat({format: V1_ITEMS_DAT, reader})
  }
}