"use strict"

module.exports = (n, multiple) => {
  return ~~((n + (multiple - 1)) / multiple)
}
