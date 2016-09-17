"use strict"

module.exports = (buffer) => {
    if (buffer.length === 320 * 66) {
        return 'v1boxraw'
    } else if (buffer.length === 16 * 32 * 20 || buffer.length === 16 * 32 * 30) {
        return 'v1chr'
    }

    return 'unknown'
}