"use strict"

module.exports = ({
  scale,
  threshold,
  cursorX,
  cursorY,
  viewportWidth,
  viewportHeight,
}) => {
  const autoScroll = {x: 0, y: 0}
  const autoScrollRight = viewportWidth - threshold * scale
  const autoScrollDown = viewportHeight - threshold * scale

  if (cursorX < threshold) {
    autoScroll.x--
  }

  if (cursorX >= autoScrollRight) {
    autoScroll.x++
  }

  if (cursorY < threshold) {
    autoScroll.y--
  }

  if (cursorY >= autoScrollDown) {
    autoScroll.y++
  }

  console.log('autoScroll', autoScroll)
  return autoScroll
}