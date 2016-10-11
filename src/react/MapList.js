"use strict"

const React = require(`react`)

const MapList = props => {
  return <div>
    <h2 className="padded-list-header">Maps</h2>
    <ul className="map-list padded-list">
      {props.mapFilenames.map((mapFilename, index) => (
        <li key={index} title={mapFilename} onClick={props.clickMapFilename.bind(null, mapFilename)}>
          {mapFilename}
        </li>
      ))}
    </ul>
  </div>
}

module.exports = MapList