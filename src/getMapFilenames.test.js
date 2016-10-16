"use strict"

const expect = require(`expect`)
const getMapFilenames = require(`./getMapFilenames`)
const path = require(`path`)

{
  // session finds all maps in launch folder
  const fileSystem = {
    files: [
      `/root.txt`,
      `/game/foo.map`,
      `/game/DOOM.MAP`,
      `/game/whatever.txt`,
      `/game/subfolder/bar.map`,
      `/game/subfolder/tileset.png`,
      `/game-two/two.map`,
      `/work/important.doc`,
    ]
  }

  expect(getMapFilenames({
    fileSystem,
    launchFolder: `/game`,
  })).toEqual([
    `foo.map`,
    `DOOM.MAP`,
    `subfolder` + path.sep + `bar.map`,
  ])
}
