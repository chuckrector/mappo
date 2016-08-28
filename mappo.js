"use strict"

const $ = require('jquery')
const jQuery = $
require('./jquery-ui-1.12.0.custom.le-frog/jquery-ui.min.js')

$('body').resizable()

const os = require('os')
const fs = require('fs')
const mapFilename = 'data/SHACK.MAP';
fs.readFile(mapFilename, (err, data) => {
  const createVerge1MapLoader = require('./createVerge1MapLoader')
  const loader = createVerge1MapLoader({data})
  const mapData = loader.load()
  console.log(mapFilename, mapData)
  mapData.zone.forEach((zone) => console.log(JSON.stringify(zone)))
  console.log('# entities', mapData.entities)
  mapData.party.forEach((entity) => console.log(JSON.stringify(entity).replace(/,/g, ',\n')))
})
