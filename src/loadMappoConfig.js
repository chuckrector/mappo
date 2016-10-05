"use strict"

const fs = require(`fs`)

module.exports = () => {
  try {
    const mappoConfigText = fs.readFileSync(`mappo.json`)

    try {
      return JSON.parse(mappoConfigText)
    } catch (exc) {
      console.log(`bad config file, using defaults. [error: ${exc.message}]`)
    }
  } catch (exc) {
    console.log(`no mappo.json found, using defaults. [error: ${exc.message}]`)
  }

  return {}
}
