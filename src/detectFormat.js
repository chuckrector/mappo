"use strict"

module.exports = (buffer) => {
    if (buffer.length === 320 * 66) {
        return 'v1boxraw'
    }

    return 'unknown'
}