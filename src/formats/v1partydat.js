"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  _: T.whitespace,
  characterCount: T.stringU8,
  party: T.list({
    chr: T.string,
    cr2: T.string,
    dat: T.string,
  }, ({record}) => record.characterCount)
}