"use strict"

const detectFormat = require(`./detectFormat`)

module.exports = ({data, expectedFormat}) => {
  let json
  try {
    json = JSON.parse(data)
  } catch (err) {
    // ignore
  }

  const errors = []
  const addError = message => {
    errors.push(`*error* ${expectedFormat}: ${message}`)
  }

  const expectField = (key, type) => {
    if (!(key in json)) {
      addError(`missing "${key}" field`)
    } else {
      if (type === `array`) {
        if (!Array.isArray(json[key])) {
          addError(`expected "${key}" to be a list but found "${typeof json[key]}": ${json[key]}`)
        }
      } else if (typeof json[key] !== type) {
        addError(`expected "${key}" to be a "${type}" but found "${typeof json[key]}": ${json[key]}`)
      }
    }
  }

  switch (expectedFormat) {
    case `mappotileset`: {
      const detectedFormat = detectFormat(data)
      if (detectedFormat !== `mappotileset`) {
        addError(`detected format is ${detectedFormat}`)
        break
      }

      if (json.signature.version === `0.1.0`) {
        expectField(`description`, `string`)
        expectField(`imageFilename`, `string`)
        expectField(`tileWidth`, `number`)
        expectField(`tileHeight`, `number`)
        expectField(`tileCount`, `number`)
        expectField(`tileColumns`, `number`)
      } else {
        addError(`unsupported version ${json.signature.version}`)
      }
    } break

    case `mappomap`: {
      const detectedFormat = detectFormat(data)
      if (detectedFormat !== `mappomap`) {
        addError(`detected format is ${detectedFormat}`)
        break
      }

      if (json.signature.version === `0.1.0`) {
        expectField(`description`, `string`)
        expectField(`tilesetFilename`, `string`)
        expectField(`layerOrder`, `array`)
        expectField(`layers`, `array`)
      } else {
        addError(`unsupported version ${json.signature.version}`)
      }
    } break

    default: {
      addError(`unrecognized format: ${expectedFormat}`)
    }
  }

  if (errors.length) {
    return {
      ok: false,
      errors,
    }
  }

  return {
    ok: true
  }
}
