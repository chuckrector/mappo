"use strict"

module.exports = ({document}) => {
  const checkerboardCanvas = document.createElement(`canvas`)
  const checkerboardCanvasContext = checkerboardCanvas.getContext(`2d`)

  checkerboardCanvas.width = 16
  checkerboardCanvas.height = 16
  checkerboardCanvasContext.fillStyle = `white`
  checkerboardCanvasContext.fillRect(0, 0, 16, 16)
  checkerboardCanvasContext.fillStyle = `silver`
  checkerboardCanvasContext.fillRect(0, 0, 8, 8)
  checkerboardCanvasContext.fillRect(8, 8, 8, 8)

  const checkerboardPattern = checkerboardCanvasContext.createPattern(checkerboardCanvas, `repeat`)

  return checkerboardPattern
}