"use strict"

const process = require(`process`)

const fs = require(`fs`)
const asset = require(`../asset`)

const partyDatFilename = process.argv[2]
const partyDatData = asset.fromDisk(partyDatFilename, asset.v1partydat)
const targetFilename = partyDatFilename + `.json`

fs.writeFileSync(targetFilename, JSON.stringify(partyDatData))

console.log(`converted`, partyDatFilename, `to`, targetFilename)
