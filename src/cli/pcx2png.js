const process = require(`process`)

const fs = require(`fs`)
const createPcxLoader = require(`../loader/createPcxLoader`)
const createPcxConverter = require(`../converter/createPcxConverter`)

const pcxFilename = process.argv[2]

const diskPcxData = fs.readFileSync(pcxFilename)
const pcxLoader = createPcxLoader({data: diskPcxData})
const pcxData = pcxLoader.load()
const pcxConverter = createPcxConverter({
  palette: pcxData.palette,
  tileWidth: pcxData.width,
  tileHeight: pcxData.height,
  raw8bitData: pcxData.raw8bitData,
})

const png = pcxConverter.convertToPng()
const targetFilename = pcxFilename + `.png`

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log(`converted`, pcxFilename, `to`, targetFilename)
