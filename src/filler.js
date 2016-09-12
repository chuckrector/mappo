"use strict"

const fill = require('lodash/fill')

module.exports = (howMany, value) => fill(new Array(howMany), value)
