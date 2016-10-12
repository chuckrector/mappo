"use strict"

module.exports = ({addEventListener, keyPressed}) => {
  const keyboard = {
    KEYCODE_SHIFT: 16,
    KEYCODE_UP: 38,
    KEYCODE_DOWN: 40,
    KEYCODE_LEFT: 37,
    KEYCODE_RIGHT: 39,
    KEYCODE_PLUS: 187,
    KEYCODE_MINUS: 189,
    KEYCODE_0: 48,
    KEYCODE_S: 83,
    KEYCODE_Y: 89,
    KEYCODE_Z: 90,
    KEYCODE_CMD: 91,
  }

  addEventListener(`keydown`, event => {
    keyPressed[event.keyCode] = true
    if (event.metaKey) {
      keyPressed.metaKey = true
    }
    if (event.ctrlKey) {
      keyPressed.ctrlKey = true
    }
    if (event.altKey) {
      keyPressed.altKey = true
    }
  })

  addEventListener(`keyup`, event => {
    keyPressed[event.keyCode] = false
    if (!event.metaKey) {
      keyPressed.metaKey = false
    }
    if (!event.ctrlKey) {
      keyPressed.ctrlKey = false
    }
    if (!event.altKey) {
      keyPressed.altKey = false
    }
  })

  keyboard.isPressed = keyCode => keyPressed[keyCode]
  keyboard.release = keyCode => keyPressed[keyCode] = false

  return keyboard
}