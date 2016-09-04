const process = require('process')

const fs = require('fs')
const createVerge2MapLoader = require('../loader/createVerge2MapLoader')
const createVerge2MapConverter = require('../converter/createVerge2MapConverter')

const mapFilename = process.argv[2]

fs.readFile(mapFilename, (err, diskMapData) => {
  const mapLoader = createVerge2MapLoader({data: diskMapData})
  const mapData = mapLoader.load()
  const mapConverter = createVerge2MapConverter(mapData)
  const json = mapConverter.convertToJson()
  const targetFilename = mapFilename + '.json'

  fs.writeFileSync(targetFilename, json)

  console.log('converted', mapFilename, 'to', targetFilename)
})
