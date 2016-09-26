"use strict"

module.exports = ({
  context,
  x,
  y,
  width,
  height,
  color='white',
}) => {
  context.strokeStyle = color
  context.globalCompositeOperation = 'source-over'
  context.lineWidth = 2
  context.strokeRect(~~x, ~~y, width, height)
}
