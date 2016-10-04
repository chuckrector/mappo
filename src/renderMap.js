"use strict"

module.exports = ({
  map,
  tileset,
  tilesetImageBitmap,
  camera,
  canvas,
  context,
  layerHidden,
}) => {
  map.mapLayerOrder.forEach(layerIndex => {
    // TODO(chuck): more holistic mapLayerOrder vetting? v2/pyramid.map refers
    //              to a map layer which doesn't exist
    const tileLayer = map.tileLayers[layerIndex]
    const isHidden = layerHidden && layerHidden[layerIndex]
    if (tileLayer && !isHidden) {
      renderLayer({
        context,
        canvas,
        tileset,
        tilesetImageBitmap,
        layer: tileLayer,
        x: camera.x * tileLayer.parallax.x,
        y: camera.y * tileLayer.parallax.y,
        transparent: layerIndex > 0,
      })
    }
  })
}
