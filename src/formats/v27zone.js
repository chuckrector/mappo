"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  name: T.stringLengthEncoded,
  description: T.stringLengthEncoded,
  actionScript: T.stringLengthEncoded,
  entityActionScript: T.stringLengthEncoded,
  actionChance: T.u32,
  actionDelay: T.u32,
  adjacentActivation: T.u8,
}
