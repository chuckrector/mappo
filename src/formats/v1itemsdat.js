"use strict"

const {T} = require(`../readFormat`)
const V1_ITEM = require(`./v1item`)

module.exports = {
  _: T.whitespace,
  itemCount: T.stringU8,
  items: T.list(V1_ITEM, ({record}) => record.itemCount),
}
