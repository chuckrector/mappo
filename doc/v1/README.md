# VERGE1 Command-Line Tools

## v1boxraw2png

`BOX.RAW` is raw 8-bit image data which typically contains only the border of
the textransparentBox displayed during dialogue. The middle region is filled by VERGE with
a translucent blue color by default.

The image data is 320x66 pixels.

Usage:

- `node src/cli/v1boxraw2png.js data/v1/VERGE.PAL data/v1/BOX.RAW`

Output:

`data/v1/BOX.RAW.png`

![alt text](/img/BOX.RAW.png?raw=true "a sample of v1boxraw2png cli output")

## v1chr2gif

Converts a VERGE1 `.CHR` file into a set of 4 animated GIF files, one per
cardinal direction. The delay between each frame is 100 milliseconds.

VERGE1 `.CHR` files contain raw 8-bit image data with up to 30 frames of
character animations. There are 5 frames per walking direction, in the order:

- down
- up
- right
- left

This leaves an additional 10 frames for scripted states.

The image data is 16x32 pixels per frame.

Usage:

- `node src/cli/v1chr2gif.js data/v1/VERGE.PAL data/v1/DARIN.CHR`

Output:

- `data/v1/DARIN.CHR-down.gif`
- `data/v1/DARIN.CHR-up.gif`
- `data/v1/DARIN.CHR-right.gif`
- `data/v1/DARIN.CHR-left.gif`

![alt text](/img/v1/DARIN.CHR-down.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/DARIN.CHR-up.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/DARIN.CHR-right.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/DARIN.CHR-left.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/SARA.CHR-down.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/SARA.CHR-up.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/SARA.CHR-right.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/SARA.CHR-left.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/CRYSTAL.CHR-down.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/CRYSTAL.CHR-up.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/CRYSTAL.CHR-right.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/CRYSTAL.CHR-left.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/DEXTER.CHR-down.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/DEXTER.CHR-up.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/DEXTER.CHR-right.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/DEXTER.CHR-left.gif?raw=true "a sample of v1chr2gif cli output")

![alt text](/img/v1/GALFREY.CHR-down.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/GALFREY.CHR-up.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/GALFREY.CHR-right.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/GALFREY.CHR-left.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/KADAN.CHR-down.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/KADAN.CHR-up.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/KADAN.CHR-right.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/KADAN.CHR-left.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/PANTHER.CHR-down.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/PANTHER.CHR-up.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/PANTHER.CHR-right.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/PANTHER.CHR-left.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/VORN.CHR-down.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/VORN.CHR-up.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/VORN.CHR-right.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/VORN.CHR-left.gif?raw=true "a sample of v1chr2gif cli output")

![alt text](/img/v1/WALKER01.CHR-down.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/WALKER01.CHR-up.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/WALKER01.CHR-right.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/WALKER01.CHR-left.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/WALKER02.CHR-down.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/WALKER02.CHR-up.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/WALKER02.CHR-right.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/WALKER02.CHR-left.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/WALKER03.CHR-down.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/WALKER03.CHR-up.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/WALKER03.CHR-right.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/WALKER03.CHR-left.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/WALKER04.CHR-down.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/WALKER04.CHR-up.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/WALKER04.CHR-right.gif?raw=true "a sample of v1chr2gif cli output")
![alt text](/img/v1/WALKER04.CHR-left.gif?raw=true "a sample of v1chr2gif cli output")

## v1chr2json

**Support:** VERGE1 only

Usage:

- `node src/cli/v1chr2json.js data/v1/VERGE.PAL data/v1/DARIN.CHR`

Output:

- `data/v1/DARIN.CHR.json`

```json
{
  "frames": [0, 0, 0, 0, 0, 0, 0, 0, 0, ...],
  "palette": [0, 0, 0, 2, 2, 2, 3, 3, 3, ...]
}
```

## v1chr2png

**Support:** VERGE1 only

Usage:

- `node src/cli/v1chr2png.js data/v1/VERGE.PAL data/v1/DARIN.CHR`

Output:

- `data/v1/DARIN.CHR.png`

![alt text](/img/DARIN.CHR.png?raw=true "a sample of v1chr2png cli output")
![alt text](/img/SARA.CHR.png?raw=true "a sample of v1chr2png cli output")
![alt text](/img/CRYSTAL.CHR.png?raw=true "a sample of v1chr2png cli output")
![alt text](/img/DEXTER.CHR.png?raw=true "a sample of v1chr2png cli output")
![alt text](/img/GALFREY.CHR.png?raw=true "a sample of v1chr2png cli output")
![alt text](/img/BUBBA.CHR.png?raw=true "a sample of v1chr2png cli output")
![alt text](/img/STAN.CHR.png?raw=true "a sample of v1chr2png cli output")

## v1chr2pnglist

**Support:** VERGE1 only

Usage:

- `node src/cli/v1chr2png.js data/v1/VERGE.PAL data/v1/DARIN.CHR`

Output:

- `data/v1/DARIN.CHR-0.png` .. `data/v1/DARIN.CHR-29.png`

![alt text](/img/v1/DARIN.CHR-0.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-1.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-2.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-3.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-4.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-5.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-6.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-7.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-8.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-9.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-10.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-11.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-12.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-13.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-14.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-15.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-16.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-17.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-18.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-19.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-20.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-21.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-22.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-23.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-24.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-25.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-26.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-27.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-28.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](/img/v1/DARIN.CHR-29.png?raw=true "a sample of v1chr2pnglist cli output")

## v1cr22png

**Support:** VERGE1 only (96x96)

Usage:

- `node src/cli/v1cr22png.js data/v1/VERGE.PAL data/v1/CRYSTAL.CR2`

Output:

- `data/v1/CRYSTAL.CR2.png`

![alt text](/img/DARIN.CR2.png?raw=true "a sample of v1cr22png cli output")
![alt text](/img/SARA.CR2.png?raw=true "a sample of v1cr22png cli output")
![alt text](/img/DEXTER.CR2.png?raw=true "a sample of v1cr22png cli output")
![alt text](/img/CRYSTAL.CR2.png?raw=true "a sample of v1cr22png cli output")
![alt text](/img/GALFREY.CR2.png?raw=true "a sample of v1cr22png cli output")

## v1equipdat2json

**Support:** VERGE1 only

Usage:

- `node src/cli/v1equipdat2json.js data/v1/EQUIP.DAT`

Output:

- `data/v1/EQUIP.DAT.json`

**Note:** Output here is abbreviated and pretty-printed for readability.

```json
{
  "numitems": 33,
  "equip": [{
    "comments": ["// Dagger"],
    "str": 5,
    "equipable": [1, 2, 3, 4, 5]
  }, {
    "comments": ["// Short Sword"],
    "str": 22,
    "equipable": [1, 5]
  }, {
    "comments": ["// Wand"],
    "str": 3,
    "mag": 5,
    "equipable": [3, 4]
  }, ...]
}
```

## v1itemicondat2png

**Support:** VERGE1 only (16x16, N tiles, 20 columns)

Usage:

- `node src/cli/v1itemicondat2png.js data/VERGE.PAL data/ITEMICON.DAT`

Output:

- `data/ITEMICON.DAT.png`

![alt text](/img/ITEMICON.DAT.png?raw=true "a sample of v1itemicondat2png cli output")

## v1itemsdat2json

**Support:** VERGE1 only

Usage:

- `node src/cli/v1itemsdat2json.js data/ITEMS.DAT`

Output:

- `data/ITEMS.DAT.json`

**Note:** Output here is abbreviated and pretty-printed for readability.

```json
{
  "numitems": 48,
  "items": [{
    "name": "Starlight",
    "icon": 0,
    "desc": "Restores_15_MP",
    "useflag": 1,
    "useeffect": 1,
    "itemType": 1,
    "equipflag": 0,
    "equipidx": 0,
    "itemPreviewCode": 0,
    "price": 300
  }, ...]
}
```

## v1mainfnt2png

**Support:** VERGE1 only (9x16, 95 tiles, 19 columns)

Usage:

- `node src/cli/v1mainfnt2png.js data/v1/VERGE.PAL data/v1/MAIN.FNT`

Output:

- `data/v1/MAIN.FNT.png`

![alt text](/img/MAIN.FNT.png?raw=true "a sample of v1mainfnt2png cli output")

## v1map2json

**Support:** VERGE1 only

Usage:

- `node src/cli/v1map2json.js data/v1/ISLAND.MAP`

Output:

- `data/v1/ISLAND.MAP.json`

**Note:** Output here is abbreviated, pretty-printed, and annotated for readability.

```json
{
  "version": 4,
  "vspFilename": "HAHN01.VSP",
  "musicFilename": "MEDIOEVA.MOD",
  "layerc": 0,
  "pmultx": 1,
  "pdivx": 1,
  "description": "Paradise Isle",
  "showname": 1,
  "saveflag": 1,
  "startX": 9,
  "startY": 1,
  "hide": 1,
  "warp": 1,
  "xsize": 50,
  "ysize": 50,
  "b": 0,
  "padding": [...],
  "layers": [ // exactly 2
    [...],
    [...],
  ],
  "mapp": [...],
  "zone": [{
    "zonename": "Default",
    "zonenamePadding": 0,
    "callevent": 0,
    "percent": 0,
    "delay": 0,
    "aaa": 0,
    "saveDescription": "Paradise Isle",
    "saveDescriptionPadding": 0
  }, ...],
  "characterFilenames": ["Crystal.chr", ...],
  "entityCount": 1,
  "entities": [{
    "worldPixelX": 46,
    "worldPixelY": 26,
    "facing": 0,
    "moving": 0,
    "movementCounter": 0,
    "frameCounter": 0,
    "specialFrame": 0,
    "characterIndex": 5,
    "movementPatternCode": 0,
    "canBeActivated": 0,
    "cannotBeObstructed": 1,
    "padding": [0, 0, 0],
    "activationScript": 2,
    "movementScript": 0,
    "speed": 2,
    "speedCounter": 0,
    "step": 0,
    "delay": 0,
    "data1": 0,
    "data2": 0,
    "data3": 0,
    "data4": 0,
    "delayCounter": 0,
    "wasActivated": 0,
    "x1": 0,
    "y1": 0,
    "x2": 0,
    "y2": 0,
    "currentCommandCode": 0,
    "currentCommandArgument": 0,
    "scriptParsingOffset": 0,
    "face": 1,
    "chasing": 0,
    "chaseSpeed": 0,
    "chaseDistance": 0,
    "currentTileX": 0,
    "currentTileY": 0,
    "futureExpansion": 0,
    "description": "Crystal"
  }],
  "movementScriptCount": 1,
  "movementScriptBufferSize": 23,
  "movementScriptOffsets": [0],
  "movementScriptBuffer": [89, 51, 87, ...],
  "scriptCount": 11,
  "scriptOffsets": [0, 728, 3118, ...],
  "scriptBuffer": [3, 0, 1, 151, 0, 0, 0, 255, ...],
}
```

## v1miscicondat2png

**Support:** VERGE1 only (16x16, 24x24, 24x40)

Usage:

- `node src/cli/v1miscicondat2png.js data/v1/VERGE.PAL data/v1/MISCICON.DAT`

Output:

- `data/v1/MISCICON.DAT.png`

![alt text](/img/MISCICON.DAT.png?raw=true "a sample of v1miscicondat2png cli output")

## v1partydat2json

**Support:** VERGE1 only

Usage:

- `node src/cli/v1partydat2json.js data/v1/PARTY.DAT`

Output:

- `data/v1/PARTY.DAT.json`

**Note:** Output here is pretty-printed for readability.

```json
{
  "tchars": 5,
  "party": [
    {"chr": "DARIN.CHR", "cr2": "DARIN.CR2", "dat": "DARIN.DAT"},
    {"chr": "SARA.CHR", "cr2": "SARA.CR2", "dat": "SARA.DAT"},
    {"chr": "DEXTER.CHR", "cr2": "DEXTER.CR2", "dat": "DEXTER.DAT"},
    {"chr": "CRYSTAL.CHR", "cr2": "CRYSTAL.CR2", "dat": "CRYSTAL.DAT"},
    {"chr": "GALFREY.CHR", "cr2": "GALFREY.CR2", "dat": "GALFREY.DAT"}
  ]
}
```

## v1smallfnt2png

**Support:** VERGE1 only (7x9, 95 tiles, 19 columns)

Usage:

- `node src/cli/v1smallfnt2png.js data/v1/VERGE.PAL data/v1/SMALL.FNT`

Output:

- `data/v1/SMALL.FNT.png`

![alt text](/img/SMALL.FNT.png?raw=true "a sample of v1smallfnt2png cli output")

## v1speechspc2png

**Support:** VERGE1 only (32x32, N tiles, 10 columns)

Usage:

- `node src/cli/v1speechspc2png.js data/v1/VERGE.PAL data/v1/SPEECH.SPC`

Output:

- `data/v1/SPEECH.SPC.png`

![alt text](/img/SPEECH.SPC.png?raw=true "a sample of v1speechspc2png cli output")

## v1transtbl2json

**Support:** VERGE1, VERGE2 (256x256 bytes)

This format is identical between VERGE1 and VERGE2.

Usage:

- `node src/cli/v1transtbl2json.js data/v1/TRANS.TBL`

Output:

- `data/v1/TRANS.TBL.json`

**Note:** Output here is abbreviated and pretty-printed for readability.

```json
{
  "transparencytbl": [0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, ...]
}
```

## v1vsp2png

**Support:** VERGE1 only (16x16, N tiles, 20 columns)

Usage:

- `node src/cli/v1vsp2png.js data/v1/HAHN01.VSP`

Output:

- `data/v1/HAHN01.VSP.png`

![alt text](/img/HAHN01.VSP.png?raw=true "a sample of v1vsp2png cli output")

