const process = require('process')

const fs = require('fs')
const createVerge1TransTblLoader = require('../loader/createVerge1TransTblLoader')
const createVerge1TransTblConverter = require('../converter/createVerge1TransTblConverter')

const transTblFilename = process.argv[2]

fs.readFile(transTblFilename, (err, diskTransTblData) => {
  const transTblLoader = createVerge1TransTblLoader({data: diskTransTblData})
  const transTblData = transTblLoader.load()
  const transTblConverter = createVerge1TransTblConverter(transTblData)
  const json = transTblConverter.convertToJson()
  const targetFilename = transTblFilename + '.json'

  fs.writeFileSync(targetFilename, json)

  console.log('converted', transTblFilename, 'to', targetFilename)
})
