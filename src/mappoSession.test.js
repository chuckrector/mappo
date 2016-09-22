"use strict"

const expect = require('expect')
const createMappoSession = require('./createMappoSession')

{
  // session finds all maps in launch folder
  const fileSystem = {
    files: [
      '/root.txt',
      '/game/foo.map',
      '/game/DOOM.MAP',
      '/game/whatever.txt',
      '/game/subfolder/bar.map',
      '/game/subfolder/tileset.png',
      '/game-two/two.map',
      '/work/important.doc',
    ]
  }

  const session = createMappoSession({
    fileSystem,
    launchFolder: '/game',
  })

  expect(session.getMapFilenames()).toEqual([
    'foo.map',
    'DOOM.MAP',
    'subfolder/bar.map',
  ])
}