"use strict"

module.exports = ({
  context,
  x,
  y,
  width,
  height,
}) => {
  context.strokeStyle = 'white'
  context.globalCompositeOperation = 'exclusion'
  context.lineWidth = 2
  context.fillRect(~~x, ~~y, width, height)
}
