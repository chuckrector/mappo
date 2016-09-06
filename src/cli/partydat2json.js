const process = require('process')

const fs = require('fs')
const createVerge1PartyDatLoader = require('../loader/createVerge1PartyDatLoader')
const createVerge1PartyDatConverter = require('../converter/createVerge1PartyDatConverter')

const partyDatFilename = process.argv[2]

const diskPartyDatData = fs.readFileSync(partyDatFilename)
const partyDatLoader = createVerge1PartyDatLoader({data: diskPartyDatData})
const partyDatData = partyDatLoader.load()
const partyDatConverter = createVerge1PartyDatConverter(partyDatData)
const json = partyDatConverter.convertToJson()
const targetFilename = partyDatFilename + '.json'

fs.writeFileSync(targetFilename, json)

console.log('converted', partyDatFilename, 'to', targetFilename)
