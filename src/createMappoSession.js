"use strict"

const path = require('path')

module.exports = ({
  fileSystem,
  launchFolder,
}) => {
  const inLaunchFolder = filename => (filename.substr(0, launchFolder.length + 1) === launchFolder + '/')
  const isMap = filename => (path.basename(filename).toLowerCase().endsWith('.map'))
  const getMapFilenames = () => {
    const mapFilenames = fileSystem.files.filter(filename => inLaunchFolder(filename) && isMap(filename))
    return mapFilenames.map(filename => path.relative(launchFolder, filename))
  }

  return {
    getMapFilenames,
  }
}