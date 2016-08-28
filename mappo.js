"use strict"

const $ = require('jquery')
const jQuery = $
require('./jquery-ui-1.12.0.custom.le-frog/jquery-ui.min.js')

$('body').resizable()

const os = require('os')
const fs = require('fs')
const mapFilename = 'data/BUMVILLE.MAP';
fs.readFile(mapFilename, (err, data) => {
  const createVerge1MapLoader = require('./createVerge1MapLoader')
  const loader = createVerge1MapLoader({data})
  const mapData = loader.load()
  console.log(mapFilename, mapData)
  console.log('nummovescripts', mapData.nummovescripts)
  console.log('msbufsize', mapData.msbufsize)
  console.log('msofstbl', JSON.stringify(mapData.msofstbl))
  console.log('msbuf', JSON.stringify(mapData.msbuf))
  console.log('numscripts', mapData.numscripts)
  console.log('scriptofstbl', JSON.stringify(mapData.scriptofstbl))
  console.log('mapvcs', mapData.mapvc.length)
})
