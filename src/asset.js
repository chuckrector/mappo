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
  v1pal: require('./formats/v1pal'),
  v1vspanim: require('./formats/v1vspanim'),
  v1vsp: require('./formats/v1vsp'),
  v1boxraw: require('./formats/v1boxraw'),
  v1mainfnt: require('./formats/v1mainfnt'),
  v1smallfnt: require('./formats/v1smallfnt'),
  v1item: require('./formats/v1item'),
  v1itemsdat: require('./formats/v1itemsdat'),
  v1partydat: require('./formats/v1partydat'),
  v1transtbl: require('./formats/v1transtbl'),
  v1speechspc: require('./formats/v1speechspc'),
  v2chr: require('./formats/v2chr'),
  v2vsp: require('./formats/v2vsp'),
  v2zone: require('./formats/v2zone'),
  v2entity: require('./formats/v2entity'),
  v2layerinfo: require('./formats/v2layerinfo'),
  v2map: require('./formats/v2map'),
}