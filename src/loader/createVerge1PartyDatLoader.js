"use strict"

const createDataReader = require('../createDataReader')
const {readFormat, T} = require('../readFormat')

module.exports = (args) => {
  const reader = createDataReader(args)

  return {
    load: () => readFormat({
      format: {
        _: T.whitespace,
        tchars: T.stringU8,
        party: T.list({
          chr: T.string,
          cr2: T.string,
          dat: T.string,
        }, ({record}) => record.tchars)
      },
      reader
    })
  }
}