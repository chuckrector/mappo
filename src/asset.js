"use strict"

const fs = require('fs')
const {readFormatData} = require('./readFormat')

const fromDisk = (filename, format) => {
  const buffer = fs.readFileSync(filename)
  return readFormatData({format, data: buffer})
}

module.exports = {
  fromDisk,
  v1zone: require('./formats/v1zone'),
  v1entity: require('./formats/v1entity'),
  v1map: require('./formats/v1map'),
  v1chr: require('./formats/v1chr'),
  v1cr2: require('./formats/v1cr2'),
}