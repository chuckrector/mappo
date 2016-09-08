const process = require('process')

const fs = require('fs')
const createVerge1TransTblLoader = require('../loader/createVerge1TransTblLoader')

const transTblFilename = process.argv[2]

const diskTransTblData = fs.readFileSync(transTblFilename)
const transTblLoader = createVerge1TransTblLoader({data: diskTransTblData})
const transTblData = transTblLoader.load()
const targetFilename = transTblFilename + '.json'

fs.writeFileSync(targetFilename, JSON.stringify(transTblData))

console.log('converted', transTblFilename, 'to', targetFilename)
