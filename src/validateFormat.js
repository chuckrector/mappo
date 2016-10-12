"use strict"

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
    let o = json
    if (key.indexOf(`.`) !== -1) {
      const parts = key.split(`.`)
      o = json[parts[0]]
      key = parts[1]
    }
    if (!(key in o)) {
      addError(`missing "${key}" field`)
    } else {
      if (type === `array`) {
        if (!Array.isArray(o[key])) {
          addError(`expected "${key}" to be a list but found "${typeof o[key]}": ${o[key]}`)
        }
      } else if (typeof o[key] !== type) {
        addError(`expected "${key}" to be a "${type}" but found "${typeof o[key]}": ${o[key]}`)
      }
    }
  }

  if (typeof json !== `object`) {
    addError(`unrecognized json format, expected object but got ${typeof json}`)
    return {
      ok: false,
      errors,
    }
  }

  expectField(`signature`, `object`)
  expectField(`signature.name`, `string`)
  expectField(`signature.version`, `string`)

  switch (expectedFormat) {
    case `mappotileset`: {
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
