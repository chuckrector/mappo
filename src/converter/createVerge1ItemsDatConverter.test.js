"use strict"

console.log('running tests:', __filename)

const expect = require('expect')
const createVerge1ItemsDatLoader = require('../loader/createVerge1ItemsDatLoader')
const createVerge1ItemsDatConverter = require('./createVerge1ItemsDatConverter')
const fill = require('lodash/fill')

const itemsDat = `
3
Starlight 0 Restores_15_MP          1 1 1 0 0 0 300 
Herb 1 Restores_15_HP               1 0 1 0 0 0 30   
Speed_Boots 2 +3_REA,_+1_MBL        0 0 0 5 0 0 300   
`

{
  // can convert ITEMS.DAT to JSON
  const loader = createVerge1ItemsDatLoader({
    data: Buffer.from(itemsDat)
  })
  const data = loader.load()
  const converter = createVerge1ItemsDatConverter(data)
  const json = converter.convertToJson()
  const js = JSON.parse(json)

  expect(js).toEqual({
    _: '\n',
    numitems: 3,
    items: [{
      name: 'Starlight',
      icon: 0,
      desc: 'Restores_15_MP',
      useflag: 1,
      useeffect: 1,
      itemtype: 1,
      equipflag: 0,
      equipidx: 0,
      itmprv: 0,
      price: 300,
    }, {
      name: 'Herb',
      icon: 1,
      desc: 'Restores_15_HP',
      useflag: 1,
      useeffect: 0,
      itemtype: 1,
      equipflag: 0,
      equipidx: 0,
      itmprv: 0,
      price: 30,
    }, {
      name: 'Speed_Boots',
      icon: 2,
      desc: '+3_REA,_+1_MBL',
      useflag: 0,
      useeffect: 0,
      itemtype: 0,
      equipflag: 5,
      equipidx: 0,
      itmprv: 0,
      price: 300,
    }]
  })
}