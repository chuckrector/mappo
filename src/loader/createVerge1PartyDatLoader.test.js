"use strict"

const expect = require('expect')
const createVerge1PartyDatLoader = require('./createVerge1PartyDatLoader')
const fill = require('lodash/fill')

const partyDat = `
5
DARIN.CHR    DARIN.CR2    DARIN.DAT
SARA.CHR     SARA.CR2     SARA.DAT
DEXTER.CHR   DEXTER.CR2   DEXTER.DAT
CRYSTAL.CHR  CRYSTAL.CR2  CRYSTAL.DAT
GALFREY.CHR  GALFREY.CR2  GALFREY.DAT
`

{
  // can read EQUIP.DAT
  const loader = createVerge1PartyDatLoader({
    data: Buffer.from(partyDat)
  })

  const data = loader.load()

  expect(data.tchars).toEqual(5)
  expect(data.party).toEqual([
    {chr: 'DARIN.CHR', cr2: 'DARIN.CR2', dat: 'DARIN.DAT'},
    {chr: 'SARA.CHR', cr2: 'SARA.CR2', dat: 'SARA.DAT'},
    {chr: 'DEXTER.CHR', cr2: 'DEXTER.CR2', dat: 'DEXTER.DAT'},
    {chr: 'CRYSTAL.CHR', cr2: 'CRYSTAL.CR2', dat: 'CRYSTAL.DAT'},
    {chr: 'GALFREY.CHR', cr2: 'GALFREY.CR2', dat: 'GALFREY.DAT'},
  ])
}