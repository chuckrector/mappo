"use strict"

const expect = require(`expect`)
const abbrevJson = require(`./abbrevJson`)

{
  // can indent
  expect(abbrevJson({foo: `bar`})).toBe(`{
  "foo": "bar"
}`)
}

{
  // can abbreviate long number lists on a single line
  expect(abbrevJson([1, 2, 3, 4, 5])).toBe(`[1, 2, 3, ...]`)
}

{
  // can keep open curlies on previous line
  const data = {
    numitems: 33,
    equip: [{
      comments: [`// Dagger`],
      str: 5,
      equipable: [1, 2, 3, 4, 5]
    }, {
      comments: [`// Short Sword`],
      str: 22,
      equipable: [1, 5]
    }, {
      comments: [`// Wand`],
      str: 3,
      mag: 5,
      equipable: [3, 4]
    }, {
      comments: [`// Poker`],
      str: 9,
      equipable: [1]
    }]
  }

  expect(abbrevJson(data)).toBe(`{
  "numitems": 33,
  "equip": [{
      "comments": [
        "// Dagger"
      ],
      "str": 5,
      "equipable": [1, 2, 3, ...]
    }, {
      "comments": [
        "// Short Sword"
      ],
      "str": 22,
      "equipable": [1, 5]
    }, {
      "comments": [
        "// Wand"
      ],
      "str": 3,
      "mag": 5,
      "equipable": [3, 4]
    },
    ...
  ]
}`)
}

{
  // empty lists
  expect(abbrevJson([])).toBe(`[]`)
}