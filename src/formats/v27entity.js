"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  name: T.stringLengthEncoded,
  x: T.u32,
  y: T.u32,
  direction: T.u32,
  speed: T.u32,
  isObstructedByMap: T.u8,
  isObstructedByEntities: T.u8,
  isObstruction: T.u8,
  chrFilename: T.stringLengthEncoded,
  adjacentActivation: T.u8,
  actionScript: T.stringLengthEncoded,
  state: T.u32,
  moveScript: T.stringLengthEncoded,
  wanderSteps: T.u32,
  wanderDelay: T.u32,
  wanderLeft: T.u32,
  wanderTop: T.u32,
  wanderRight: T.u32,
  wanderBottom: T.u32,
  zone: T.stringLengthEncoded,
  chaseTarget: T.stringLengthEncoded,
  chaseDist: T.u32,
}
