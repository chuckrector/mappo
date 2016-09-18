"use strict"

const isNumberList = (v) => !v.filter(v => typeof v !== 'number').length
const abbrevArray = (v) => v.length > 3 ? [...v.slice(0, 3), '...'] : v

const NUMLIST_SENTINEL = '_____NumList_____'
const NUMLIST_REPLACER_REGEX = new RegExp(
  '"' + NUMLIST_SENTINEL + '\\[(.*?)\\]' + NUMLIST_SENTINEL + '"', 'g'
)

// [1, 2, 3, 4, 5] becomes "_____NumList____[1,2,3,4,5]_____NumList_____"
const encodeNumList = (v) => (
  NUMLIST_SENTINEL + JSON.stringify(v) + NUMLIST_SENTINEL
)

const decodeNumLists = (s) => (
  s.replace(NUMLIST_REPLACER_REGEX, (m, body) =>
    ('[' + body + ']')
    // space between each
    .replace(/,/g, ', ')
    // numeric lists will have escaped ellipsis string tails
    .split('\\"...\\"').join('...')
  )
)

const valueReplacer = (k, v) => {
  if (Array.isArray(v)) {
    v = abbrevArray(v)

    const isAbbreviated = v.slice(-1)[0] === '...'
    const isNumList = isNumberList(isAbbreviated ? v.slice(0, -1) : v)

    if (v.length && isNumList) {
      return encodeNumList(v)
    }
  }

  return v
}

const normalizeEllipses = (s) => (
  // non-numeric lists will have normal ellipsis string tails
  s.split('"..."').join('...')
)

const pullOpeningCurliesUpToPreviousLine = (s) => (
  // will produce [{ and },{
  s.replace(/\n\s+{/g, '{')
  // [{ is fine but i want },{ to be spaced out
  .replace(/},{/g, '}, {')
)

module.exports = (data) => {
  let s = JSON.stringify(data, valueReplacer, '  ')

  s = normalizeEllipses(s)
  s = pullOpeningCurliesUpToPreviousLine(s)
  s = decodeNumLists(s)

  return s
}