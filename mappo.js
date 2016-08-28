"use strict"

const $ = require('jquery')
const jQuery = $
require('./jquery-ui-1.12.0.custom.le-frog/jquery-ui.min.js')

$('body').resizable()

const os = require('os')
const fs = require('fs')
const mapFilename = 'data/ISLAND.MAP';
fs.readFile(mapFilename, (err, data) => {
  const createVerge1MapLoader = require('./createVerge1MapLoader')
  const loader = createVerge1MapLoader({data})
  const mapData = loader.load()
  console.log(mapFilename, mapData)
  for (let i = 0; i < 128; i++) {
    console.log(JSON.stringify(mapData.zone[i]))
  }
})
