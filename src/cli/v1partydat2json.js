const process = require('process')

const fs = require('fs')
const createVerge1PartyDatLoader = require('../loader/createVerge1PartyDatLoader')

const partyDatFilename = process.argv[2]

const diskPartyDatData = fs.readFileSync(partyDatFilename)
const partyDatLoader = createVerge1PartyDatLoader({data: diskPartyDatData})
const partyDatData = partyDatLoader.load()
const targetFilename = partyDatFilename + '.json'

fs.writeFileSync(targetFilename, JSON.stringify(partyDatData))

console.log('converted', partyDatFilename, 'to', targetFilename)
