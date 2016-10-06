"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  // v1 chrs are 16x32 and can hold up to 30 frames. some contain
  // fewer frames, such as DARIN2.CHR, DARIN3.CHR, etc. (20 frames)
  // just grab the whole file, no need to be picky
  chrs: T.list(T.u8, ({reader}) => reader.remaining)
}