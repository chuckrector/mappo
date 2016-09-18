"use strict"

const fs = require('fs')
const {readFormatData} = require('./readFormat')

const fromBuffer = (buffer, formatMetadata) => {
  const {format, formatName} = formatMetadata

  let diskData
  try {
    console.log('reading as', formatName)
    diskData = readFormatData({
      format,
      data: buffer,
    })
  } catch (e) {
    const engineVersion = parseInt(formatName.substr(1, 2), 10)
    const formatType = formatName.substr(2)

    console.log('-- error:', e.name + ':', e.message)

    if (engineVersion > 1) {
      console.log(`-- possibly v${engineVersion - 1}${formatType}?`)
    }

    console.log('-- ignoring')
    process.exit(0)
  }

  return diskData
}

const fromDisk = (filename, formatMetadata) => {
  console.log('reading', filename, 'from disk')
  const buffer = fs.readFileSync(filename)

  return fromBuffer(buffer, formatMetadata)
}

const allFormats = {
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
  v1miscicondat: require('./formats/v1miscicondat'),
  v1itemicondat: require('./formats/v1itemicondat'),
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
  v2kjchr: require('./formats/v2kjchr'),
  v3chranim: require('./formats/v3chranim'),
  v3chr: require('./formats/v3chr'),
  v3vspanim: require('./formats/v3vspanim'),
  v3vsp: require('./formats/v3vsp'),
  v3zone: require('./formats/v3zone'),
  v3entity: require('./formats/v3entity'),
  v3layerinfo: require('./formats/v3layerinfo'),
  v3map: require('./formats/v3map'),
}

const exportMe = {
  fromBuffer,
  fromDisk,
}

// build format metadata, mostly to have access to loader names when loaders fail
Object.keys(allFormats).forEach((formatName) => {
  exportMe[formatName] = {
    formatName,
    format: allFormats[formatName],
  }
})

module.exports = exportMe
