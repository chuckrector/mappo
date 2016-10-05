"use strict"

const fs = require(`fs`)

module.exports = config => {
  let mappoConfigText
  try {
    mappoConfigText = JSON.stringify(config)
  } catch (exc) {
    console.log(`bad config object, not saving config. [error: ${exc.message}]`)
    return
  }

  try {
    fs.writeFileSync(`mappo.json`, mappoConfigText)
    console.log(`editor state successfully saved`)
  } catch (exc) {
    console.log(`unable to write config to disk. [error: ${exc.message}]`)
  }
}
