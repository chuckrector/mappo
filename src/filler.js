"use strict"

const fill = require(`lodash/fill`)

module.exports = (howMany, value=0) => fill(new Array(howMany), value)
