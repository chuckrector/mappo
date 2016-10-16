"use strict"

const path = require(`path`)

module.exports = ({
  fileSystem,
  launchFolder,
}) => {
  const inLaunchFolder = filename => (filename.substr(0, launchFolder.length + 1) === launchFolder + `/`)
  const isMap = filename => {
    const basename = path.basename(filename).toLowerCase()
    const isIt = basename.endsWith(`.map`) || basename.endsWith(`.map.json`)
    return isIt
  }
  const mapFilenames = fileSystem.files.filter(filename => {
    return inLaunchFolder(filename) && isMap(filename)
  })

  return mapFilenames.map(filename => path.relative(launchFolder, filename))
}
