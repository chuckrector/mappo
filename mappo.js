"use strict"

const $ = require('jquery')
const jQuery = $
require('./jquery-ui-1.12.0.custom.le-frog/jquery-ui.min.js')

$('body').resizable()

const fs = require('fs')
const mapFilename = 'data/OLDVILLE.MAP';
fs.readFile(mapFilename, (err, data) => {
  const createVerge1MapLoader = require('./createVerge1MapLoader')
  const loader = createVerge1MapLoader({data})
  const mapData = loader.load()
  console.log(mapFilename, JSON.stringify(mapData))
})
