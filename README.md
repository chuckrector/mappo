# mappo v0.13.0

Currently, a collection of command-line tools which can load and convert various [VERGE](http://verge-rpg.com/) file formats. The skeleton of an Electron app is also included. After I've written loaders and converters for all known VERGE file formats, I'll start building a map editor in the Electron app.

# Why?

Grue showed me his cool [maped4](https://github.com/mcgrue/maped4) project. It exploded when I tried to use it, so I created this project to isolate the issues and understand why. Node and Electron and VERGE are cool, so I kept going. It's a fun way to probe unfamiliar territory (Node and Electron) with a familiar face (VERGE).

In ancient times, I worked on my own map editor. http://chuckrector.com/old/ So, I have a soft spot. Partly, this project is about "Can I do what I once did more easily?" Partly, it's also about "How much more powerful am I now?"

# Learnings

- The `jquery-ui` npm package sucks. If you want jQuery UI in Node, directly package it.

# Requirements

- Node >= 5.10.0

# Installation

1. npm install
2. npm start

# Supported File Formats

What does support mean? Currently, at least one loader. Optionally, one or more converters.

 | VERGE1 | VERGE2 | VERGE3
--- |:---:|:---:|:---:
PCX          | ✓ | ✓ | ✓
BOX.RAW      | ✓ | n/a | n/a
CHR          | ✓ | ✓ | ✗
CR2          | ✓ | n/a | n/a
EQUIP.DAT    | ✓ | n/a | n/a
ITEMICON.DAT | ✓ | n/a | n/a
ITEMS.DAT    | ✓ | n/a | n/a
MAIN.FNT     | ✓ | n/a | n/a
MAP          | ✓ | ✓ | ✗
MISCICON.DAT | ✓ | n/a | n/a
PAL          | ✓ | n/a | n/a
PARTY.DAT    | ✓ | n/a | n/a
SMALL.FNT    | ✓ | n/a | n/a
SPEECH.SPC   | ✓ | n/a | n/a
TRANS.TBL    | ✓ | ✓ | n/a
VSP          | ✓ | ✓ | ✗
VC           | ✗ | ✗ | ✗
VCS          | ✗ | ✗ | n/a
save games   | ✗ | n/a | n/a

# boxraw2png

**Support:** VERGE1 only (320x66)

Usage:

- `node src/cli/boxraw2png.js data/VERGE.PAL data/BOX.RAW`

Output:

`data/BOX.RAW.png`

![alt text](img/BOX.RAW.png?raw=true "a sample of boxraw2png cli output")

# chr2png

**Support:** VERGE1 only

Usage:

- `node src/cli/chr2png.js data/VERGE.PAL data/DARIN.CHR`

Output:

- `data/DARIN.CHR.png`

![alt text](img/DARIN.CHR.png?raw=true "a sample of chr2png cli output")
![alt text](img/SARA.CHR.png?raw=true "a sample of chr2png cli output")
![alt text](img/CRYSTAL.CHR.png?raw=true "a sample of chr2png cli output")
![alt text](img/DEXTER.CHR.png?raw=true "a sample of chr2png cli output")
![alt text](img/GALFREY.CHR.png?raw=true "a sample of chr2png cli output")
![alt text](img/BUBBA.CHR.png?raw=true "a sample of chr2png cli output")
![alt text](img/STAN.CHR.png?raw=true "a sample of chr2png cli output")

# cr22png

**Support:** VERGE1 only (96x96)

Usage:

- `node src/cli/cr22png.js data/VERGE.PAL data/CRYSTAL.CR2`

Output:

- `data/CRYSTAL.CR2.png`

![alt text](img/DARIN.CR2.png?raw=true "a sample of cr22png cli output")
![alt text](img/SARA.CR2.png?raw=true "a sample of cr22png cli output")
![alt text](img/DEXTER.CR2.png?raw=true "a sample of cr22png cli output")
![alt text](img/CRYSTAL.CR2.png?raw=true "a sample of cr22png cli output")
![alt text](img/GALFREY.CR2.png?raw=true "a sample of cr22png cli output")

# equipdat2json

**Support:** VERGE1 only

Usage:

- `node src/cli/equipdat2json.js data/EQUIP.DAT`

Output:

- `data/EQUIP.DAT.json`

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

# itemicondat2png

**Support:** VERGE1 only (16x16, N tiles, 20 columns)

Usage:

- `node src/cli/itemicondat2png.js data/VERGE.PAL data/ITEMICON.DAT`

Output:

- `data/ITEMICON.DAT.png`

![alt text](img/ITEMICON.DAT.png?raw=true "a sample of itemicondat2png cli output")

# itemsdat2json

**Support:** VERGE1 only

Usage:

- `node src/cli/itemsdat2json.js data/ITEMS.DAT`

Output:

- `data/ITEMS.DAT.json`

**Note:** Output here is abbreviated and pretty-printed for readability.

```json
{
  "numitems": 48,
  "items": [
    {
      "name": "Starlight",
      "icon": 0,
      "desc": "Restores_15_MP",
      "useflag": 1,
      "useeffect": 1,
      "itemtype": 1,
      "equipflag": 0,
      "equipidx": 0,
      "itmprv": 0,
      "price": 300
    },
    ...
  ]
```

# mainfnt2png

**Support:** VERGE1 only (9x16, 95 tiles, 19 columns)

Usage:

- `node src/cli/mainfnt2png.js data/VERGE.PAL data/MAIN.FNT`

Output:

- `data/MAIN.FNT.png`

![alt text](img/MAIN.FNT.png?raw=true "a sample of mainfnt2png cli output")

# map2json

**Support:** VERGE1 only

Usage:

- `node src/cli/map2json.js data/ISLAND.MAP`

Output:

- `data/ISLAND.MAP.json`

**Note:** Output here is abbreviated and pretty-printed for readability.

```json
{
  "version": 4,
  "vsp0name": "HAHN01.VSP",
  "musname": "MEDIOEVA.MOD",
  "layerc": 0,
  "pmultx": 1,
  "pdivx": 1,
  "levelname": "Paradise Isle",
  "showname": 1,
  "saveflag": 1,
  "startx": 9,
  "starty": 1,
  "hide": 1,
  "warp": 1,
  "xsize": 50,
  "ysize": 50,
  "b": 0,
  "padding": [...],
  "map0": [...],
  "map1": [...],
  "mapp": [...],
  "zone": [{
    "zonename": "Default",
    "zonenamePadding": 0,
    "callevent": 0,
    "percent": 0,
    "delay": 0,
    "aaa": 0,
    "savedesc": "Paradise Isle",
    "savedescPadding": 0
  }, ...],
  "chrlist": ["Crystal.chr", ...],
  "entities": 1,
  "party": [{
    "x": 46,
    "y": 26,
    "facing": 0,
    "moving": 0,
    "movcnt": 0,
    "framectr": 0,
    "specframe": 0,
    "chrindex": 5,
    "movecode": 0,
    "activmode": 0,
    "obsmode": 1,
    "padding": [0, 0, 0],
    "actscript": 2,
    "movescript": 0,
    "speed": 2,
    "speedct": 0,
    "step": 0,
    "delay": 0,
    "data1": 0,
    "data2": 0,
    "data3": 0,
    "data4": 0,
    "delayct": 0,
    "adjactv": 0,
    "x1": 0,
    "y1": 0,
    "x2": 0,
    "y2": 0,
    "curcmd": 0,
    "cmdarg": 0,
    "scriptofs": 0,
    "face": 1,
    "chasing": 0,
    "chasespeed": 0,
    "chasedist": 0,
    "cx": 0,
    "cy": 0,
    "expand": 0,
    "entitydesc": "Crystal"
  }],
  "nummovescripts": 1,
  "msbufsize": 23,
  "msofstbl": [0],
  "msbuf": [89, 51, 87, ...],
  "numscripts": 11,
  "scriptofstbl": [0, 728, 3118, ...],
  "mapvc": [3, 0, 1, 151, 0, 0, 0, 255, ...],
}
```

# miscicondat2png

**Support:** VERGE1 only (16x16, 24x24, 24x40)

Usage:

- `node src/cli/miscicondat2png.js data/VERGE.PAL data/MISCICON.DAT`

Output:

- `data/MISCICON.DAT.png`

![alt text](img/MISCICON.DAT.png?raw=true "a sample of miscicondat2png cli output")

# partydat2json

**Support:** VERGE1 only

Usage:

- `node src/cli/partydat2json.js data/PARTY.DAT`

Output:

- `data/PARTY.DAT.json`

**Note:** Output here is pretty-printed for readability.

```json
{
  "tchars": 5,
  "party": [
    {
      "chr": "DARIN.CHR",
      "cr2": "DARIN.CR2",
      "dat": "DARIN.DAT"
    },
    {
      "chr": "SARA.CHR",
      "cr2": "SARA.CR2",
      "dat": "SARA.DAT"
    },
    {
      "chr": "DEXTER.CHR",
      "cr2": "DEXTER.CR2",
      "dat": "DEXTER.DAT"
    },
    {
      "chr": "CRYSTAL.CHR",
      "cr2": "CRYSTAL.CR2",
      "dat": "CRYSTAL.DAT"
    },
    {
      "chr": "GALFREY.CHR",
      "cr2": "GALFREY.CR2",
      "dat": "GALFREY.DAT"
    }
  ]
}
```

# pcx2png

Usage:

- `node src/cli/pcx2png.js data/STAN.PCX`

Output:

- `data/STAN.PCX.png`

![alt text](img/STAN.PCX.png?raw=true "a sample of pcx2png cli output")
![alt text](img/VERGE1.PCX.png?raw=true "a sample of pcx2png cli output")
![alt text](img/VERGE320.PCX.png?raw=true "a sample of pcx2png cli output")

# smallfnt2png

**Support:** VERGE1 only (7x9, 95 tiles, 19 columns)

Usage:

- `node src/cli/smallfnt2png.js data/VERGE.PAL data/SMALL.FNT`

Output:

- `data/SMALL.FNT.png`

![alt text](img/SMALL.FNT.png?raw=true "a sample of smallfnt2png cli output")

# speechspc2png

**Support:** VERGE1 only (32x32, N tiles, 10 columns)

Usage:

- `node src/cli/speechspc2png.js data/VERGE.PAL data/SPEECH.SPC`

Output:

- `data/SPEECH.SPC.png`

![alt text](img/SPEECH.SPC.png?raw=true "a sample of speechspc2png cli output")

# transtbl2json

**Support:** VERGE1, VERGE2 (256x256 bytes)

This format is identical between VERGE1 and VERGE2.

Usage:

- `node src/cli/transtbl2json.js data/TRANS.TBL`

Output:

- `data/TRANS.TBL.json`

**Note:** Output here is abbreviated and pretty-printed for readability.

```json
{
  "transparencytbl": [0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, ...]
}
```

# v2chr2png

See `v2vsp2pal` for details on how to generate `VERGE2.PAL`.

**Support:** VERGE2 only (WxH, N tiles, 5 columns)

Usage:

- `node src/cli/v2chr2png.js data/v2/VERGE2.PAL data/v2/VECNA.CHR`

Output:

- `data/v2/VECNA.CHR.png`

![alt text](img/VECNA.CHR.png?raw=true "a sample of v2chr2png cli output")
![alt text](img/SHIVARA.CHR.png?raw=true "a sample of v2chr2png cli output")
![alt text](img/SEREN.CHR.png?raw=true "a sample of v2chr2png cli output")
![alt text](img/LEPER.CHR.png?raw=true "a sample of v2chr2png cli output")
![alt text](img/JITORO.CHR.png?raw=true "a sample of v2chr2png cli output")
![alt text](img/EMIRA.CHR.png?raw=true "a sample of v2chr2png cli output")
![alt text](img/ELGARD.CHR.png?raw=true "a sample of v2chr2png cli output")

# v2map2json

**Support:** VERGE2 only

Usage:

- `node src/cli/v2map2json.js data/v2/town.map`

Output:

- `data/v2/town.map.json`

**Note:** Output here is abbreviated and pretty-printed for readability.

```json
{
  "version": [77, 65, 80, 249, 53, 0],
  "mapEventsOffset": 23233,
  "vspname": "grue0041.vsp",
  "musname": "",
  "rstring": "1E2",
  "xstart": 1,
  "ystart": 1,
  "wrap": 0,
  "padding": [77, 65, 80, ...],
  "numlayers": 2,
  "layer": [{
    "pmultx": 1,
    "pdivx": 1,
    "pmulty": 1,
    "pdivy": 1,
    "sizex": 200,
    "sizey": 200,
    "trans": 0,
    "hline": 0,
    "padding": [1, 1]
  }, ...],
  "layers": [{
    "bufsize": 14272,
    "compressed": [255, 255, 0, ...],
    "decompressed": [0, 0, 0, ...],
  }, ...],
  "obstruct": {
    "bufsize": 1472,
    "compressed": [255, 254, 0, ...],
    "decompressed": [0, 0, 0, ...]
  },
  "zone": {
    "bufsize": 1130,
    "compressed": [255, 254, 0, ...],
    "decompressed": [0, 0, 0, ...]
  },
  "numzones": 25,
  "zones": [{
    "name": "",
    "script": 0,
    "percent": 0,
    "delay": 0,
    "aaa": 0,
    "entityscript": 0
  }, ...],
  "nmchr": 5,
  "chrlist": [
    "DESMAN1.CHR",
    "DESMAN2.CHR",
    "DESWOM1.CHR",
    "deswom2.chr",
    "LEPER.CHR"
  ],
  "entities": 34,
  "entity": [{
    "x": 37,
    "y": 48,
    "tx": 0,
    "ty": 0,
    "facing": 0,
    "moving": 0,
    "movcnt": 0,
    "frame": 0,
    "specframe": 0,
    "chrindex": 0,
    "reset": 0,
    "obsmode1": 1,
    "obsmode2": 1,
    "speed": 0,
    "speedct": 0,
    "delayct": 0,
    "animofs": 0,
    "scriptofs": 0,
    "face": 1,
    "actm": 0,
    "movecode": 2,
    "movescript": 0,
    "ctr": 0,
    "mode": 0,
    "modePadding": [1, 0],
    "step": 100,
    "delay": 0,
    "stepctr": 0,
    "delayctr": 0,
    "data1": 0,
    "data2": 0,
    "data3": 0,
    "data4": 0,
    "data5": 0,
    "data6": 0,
    "actscript": 25,
    "expand1": 0,
    "expand2": 0,
    "expand3": 0,
    "expand4": 0,
    "desc": ""
  }, ...],
  "nummovescripts": 2,
  "msbufsize": 14,
  "msofstbl": [0, 1],
  "msbuf": [0, 68, 52, ...],
  "numthings": 0,
  "mapevents": 58,
  "mapvctbl": [0, 4, 40, ...],
  "codesize": 11044,
  "mapvc": [3, 233, 1, ...]
}
```

# v2vsp2pal

This is a temporary helper for `v2chr2png`.

**Support:** VERGE2 only

Usage:

- `node src/cli/v2vsp2pal.js data/v2/GRUE0041.VSP`

Output:

- `VERGE2.PAL`

# v2vsp2png

**Support:** VERGE2 only

Usage:

- `node src/cli/v2vsp2png.js data/v2/RUINS.VSP`

Output:

- `data/v2/RUINS.VSP.png`

![alt text](img/RUINS.VSP.png?raw=true "a sample of v2vsp2png cli output")
![alt text](img/SULLY2A.VSP.png?raw=true "a sample of v2vsp2png cli output")

# vsp2png

**Support:** VERGE1 only (16x16, N tiles, 20 columns)

Usage:

- `node src/cli/vsp2png.js data/HAHN01.VSP`

Output:

- `data/HAHN01.VSP.png`

![alt text](img/HAHN01.VSP.png?raw=true "a sample of vsp2png cli output")

# TODO

- kildorf | aen: if you could output a json file describing the animation data (etc.) that'd be pretty sweet
- json pretty printer that abbreviates long lists with ellipses
- i frequently forget to do `new Uint16Array([1, 2, 3])` and instead do `new Uint16Array(1, 2, 3)`, esp. when formatting across multiple lines. it fails in a very confusing way. need to put an abstraction on top of it that explodes usefully
- optimization pass. cli tests take 1.5s now and there are still at least three more intensive VERGE3 PNG converter cli left to be written
- support for conditional blocks in declarative parser (e.g. EQUIP.DAT)
