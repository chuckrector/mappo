"use strict"

console.log('running tests:', __filename)

const expect = require('expect')
const createVerge1EquipDatLoader = require('../loader/createVerge1EquipDatLoader')
const createVerge1EquipDatConverter = require('./createVerge1EquipDatConverter')
const fill = require('lodash/fill')

const equipDat = `
3
// Dagger
ATK +9
DEF +8
MAG +7
MGR +6
HIT +5
DOD +4
MBL +3
FER +2
REA -1
EQABLE 1 2 4 5
ONEQUIP 99
ONDEEQUIP 88
- // Short Sword
ATK +22
EQABLE 1 5
- // Wand
ATK +3
MAG +5
EQABLE 3 4
-
`

{
  // can convert EQUIP.DAT to JSON
  const loader = createVerge1EquipDatLoader({
    data: Buffer.from(equipDat)
  })
  const data = loader.load()
  const converter = createVerge1EquipDatConverter(data)
  const json = converter.convertToJson()
  const js = JSON.parse(json)

  expect(js).toEqual({
    numitems: 3,
    equip: [{
      comments: ['// Dagger'],
      str: 9,
      end: 8,
      mag: 7,
      mgr: 6,
      hit: 5,
      dod: 4,
      mbl: 3,
      fer: 2,
      rea: -1,
      equipable: [1, 2, 4, 5],
      onequip: 99,
      ondeequip: 88,
    }, {
      comments: ['// Short Sword'],
      str: 22,
      equipable: [1, 5],
    }, {
      comments: ['// Wand'],
      str: 3,
      mag: 5,
      equipable: [3, 4],
    }]
  })
}