"use strict"

module.exports = ({canvas, pattern}) => {
  const context = canvas.getContext('2d')
  context.globalCompositeOperation = 'source-over'
  context.fillStyle = pattern
  context.fillRect(0, 0, canvas.width, canvas.height)
}
