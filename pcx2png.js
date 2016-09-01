const process = require('process')

const fs = require('fs')
const createPcxLoader = require('./createPcxLoader')
const createPcxConverter = require('./createPcxConverter')

const pcxFilename = process.argv[2]

fs.readFile(pcxFilename, (err, diskPcxData) => {
  const pcxLoader = createPcxLoader({data: diskPcxData})
  const pcxData = pcxLoader.load()
  const pcxConverter = createPcxConverter({
    palette: pcxData.palette,
    tileWidth: pcxData.width,
    tileHeight: pcxData.height,
    raw8bitData: pcxData.raw8bitData,
  })
  const png = pcxConverter.convertToPng()

  png.pack().pipe(fs.createWriteStream(pcxFilename + '.png'))
})
