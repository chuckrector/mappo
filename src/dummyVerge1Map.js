"use strict"

const filler = require(`./filler`)
const {makeBuffer, B} = require(`./makeBuffer`)

const mapWidth = 2
const mapHeight = 3
const mapHeader = makeBuffer([
  B.u8(4),
  B.stringFixed(13, `HAHN01.VSP`),
  B.stringFixed(13, `VANGELIS.MOD`),
  B.u8([0, 1, 1]),
  B.stringFixed(30, `Village - Past`),
  B.u8([1, 0]),
  B.u16([21, 1]),
  B.u8([1, 1]),
  B.u16([mapWidth, mapHeight]),
  B.u8(0),
  B.u8(filler(27, 0))
])

const mapBackgroundLayerData = filler(mapWidth * mapHeight, 33)
const mapForegroundLayerData = filler(mapWidth * mapHeight, 44)
const mapObstructionLayerData = filler(mapWidth * mapHeight, 55)
const mapLayers = makeBuffer([
  B.u16(mapBackgroundLayerData),
  B.u16(mapForegroundLayerData),
  B.u8(mapObstructionLayerData),
])

const zone = makeBuffer([
  // zonename
  B.stringFixed(15, `Default`),
  // padding
  B.u8(0),
  // callevent
  B.u16(1),
  // percent, delay, acceptAdjacentActivation
  B.u8([255, 0, 1]),
  // saveDescription
  B.stringFixed(30, `Rodne`),
  // padding
  B.u8(0),
])

const mapZones = makeBuffer(
  filler(128, zone)
)

const chrList = makeBuffer(
  filler(100, B.stringFixed(13, `DARIN.CHR`))
)

const entity = makeBuffer([
  // x, y
  B.u16([2, 1]),
  // facing, moving, movementCounter, frameCounter, specialFrame, characterIndex, movementPatternCode, canBeActivated, cannotBeObstructed
  B.u8([9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0]),
  // activationScript, movementScript
  B.u32([2, 1]),
  // speed, speedCounter
  B.u8([2, 1]),
  // step..y2
  B.u16([12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]),
  // currentCommandCode, currentCommandArgument
  B.u8([2, 1]),
  // scriptParsingOffset
  B.u32(1),
  // face, chasing, chaseSpeed, chaseDistance
  B.u8([4, 3, 2, 1]),
  // currentTileX, currentTileY
  B.u16([2, 1]),
  // futureExpansion
  B.u32(1),
  // description
  B.stringFixed(20, `Description`),
])

const entityCount = 3
const mapEntities = makeBuffer(
  filler(entityCount, entity)
)

const scripts = makeBuffer([
  // movementScriptCount
  B.u8(5),
  // movementScriptBufferSize
  B.u32(50),
  // movementScriptOffsets
  B.u32([0, 10, 20, 30, 40]),
  // movementScriptBuffer
  B.u8(filler(50, 99)),
  // scriptCount, scriptParsingOffsettb,
  B.u32([3, 0, 10, 20]),
  // scriptBuffer
  B.u8(filler(30, 88)),
])

const map = makeBuffer([
  mapHeader,
  mapLayers,
  mapZones,
  chrList,
  B.u32(entityCount),
  mapEntities,
  scripts,
])

module.exports = {
  mapWidth,
  mapHeight,
  mapHeader,
  mapBackgroundLayerData,
  mapForegroundLayerData,
  mapObstructionLayerData,
  mapLayers,
  zone,
  mapZones,
  chrList,
  entity,
  entityCount,
  mapEntities,
  scripts,
  map,
}
