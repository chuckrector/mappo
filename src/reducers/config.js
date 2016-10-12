"use strict"

const {combineReducers} = require(`redux`)
const recentMapFilename = require(`./recentMapFilename`)
const window = require(`./window`)

module.exports = combineReducers({
  recentMapFilename,
  window,
})