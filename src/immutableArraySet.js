"use strict"

module.exports = ({array, index, newValue}) => {
  return [...array.slice(0, index), newValue, ...array.slice(index + 1)]
}

