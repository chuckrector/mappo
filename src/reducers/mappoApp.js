"use strict"

const {combineReducers} = require(`redux`)
const config = require(`./config`)
const session = require(`./session`)

module.exports = combineReducers({
  config,
  session,
})
