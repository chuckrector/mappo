"use strict"

const React = require(`react`)
const ReactDOM = require(`react-dom`)
const MapList = require(`./MapList.js.compiled`)

module.exports = ({
  mapFilenames,
  mapListContainer,
  clickMapFilename,
}) => {
  ReactDOM.render(
    <MapList
      mapFilenames={mapFilenames}
      clickMapFilename={clickMapFilename} />,
    mapListContainer
  )
}