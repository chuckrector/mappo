"use strict"

const process = require(`process`)
const path = require(`path`)
const fs = require(`fs`)
const detectFormat = require(`./detectFormat`)

if (process.argv.length !== 3) {
  const whereAmI = path.relative(process.cwd(), __filename)
  console.log(`usage: node ` + whereAmI + ` <filename>`)
  process.exit(0)
}

const filename = process.argv[2]
const buffer = fs.readFileSync(filename)

console.log(detectFormat(buffer), `<--`, filename)
