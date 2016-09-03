# mappo

Currently, a collection of command-line tools which can load and convert various [VERGE](http://verge-rpg.com/) file formats. The skeleton of an Electron app is also included. After I've written loaders and converters for all known VERGE file formats, I'll start building a map editor in the Electron app.

# Why?

Grue showed me his cool [maped4](https://github.com/mcgrue/maped4) project. It exploded when I tried to use it, so I created this project to isolate the issues and understand why. Node and Electron and VERGE are cool, so I kept going. It's a fun way to probe unfamiliar territory (Node and Electron) with a familiar face (VERGE).

# Learnings

- The `jquery-ui` npm package sucks. If you want jQuery UI in Node, directly package it.

# Requirements

- Node >= 5.10.0

# Installation

1. npm install
2. npm start

# chr2png

**Support:** VERGE1 only

Usage:

- node src/cli/chr2png.js data/VERGE.PAL data/DARIN.CHR

Output:

- data/DARIN.CHR.png

![alt text](img/chr2png-example.png?raw=true "a sample of chr2png cli output")
![alt text](img/chr2png-example6.png?raw=true "a sample of chr2png cli output")
![alt text](img/chr2png-example3.png?raw=true "a sample of chr2png cli output")
![alt text](img/chr2png-example4.png?raw=true "a sample of chr2png cli output")
![alt text](img/chr2png-example5.png?raw=true "a sample of chr2png cli output")
![alt text](img/chr2png-example2.png?raw=true "a sample of chr2png cli output")
![alt text](img/chr2png-example7.png?raw=true "a sample of chr2png cli output")

# vsp2png

**Support:** VERGE1 only (16x16, N tiles, 20 columns)

Usage:

- node src/cli/vsp2png.js data/HAHN01.VSP

Output:

- data/HAHN01.VSP.png

![alt text](img/vsp2png-example.png?raw=true "a sample of vsp2png cli output")

# smallfnt2png

**Support:** VERGE1 only (7x9, 95 tiles, 19 columns)

Usage:

- node src/cli/smallfnt2png.js data/VERGE.PAL data/SMALL.FNT

Output:

- data/SMALL.FNT.png

**Note:** Gray background added here for legibility. Actual output has a transparent background.

![alt text](img/smallfnt2png-example.png?raw=true "a sample of smallfnt2png cli output")

# mainfnt2png

**Support:** VERGE1 only (9x16, 95 tiles, 19 columns)

Usage:

- node src/cli/mainfnt2png.js data/VERGE.PAL data/MAIN.FNT

Output:

- data/MAIN.FNT.png

**Note:** Gray background added here for legibility. Actual output has a transparent background.

![alt text](img/mainfnt2png-example.png?raw=true "a sample of mainfnt2png cli output")

# boxraw2png

**Support:** VERGE1 only (320x66)

Usage:

- node src/cli/boxraw2png.js data/VERGE.PAL data/BOX.RAW

Output:

- data/BOX.RAW.png

![alt text](img/boxraw2png-example.png?raw=true "a sample of boxraw2png cli output")

# speechspc2png

**Support:** VERGE1 only (32x32, N tiles, 10 columns)

Usage:

- node src/cli/speechspc2png.js data/VERGE.PAL data/SPEECH.SPC

Output:

- data/SPEECH.SPC.png

![alt text](img/speechspc2png-example.png?raw=true "a sample of speechspc2png cli output")

# cr22png

**Support:** VERGE1 only (96x96)

Usage:

- node src/cli/cr22png.js data/VERGE.PAL data/CRYSTAL.CR2

Output:

- data/CRYSTAL.CR2.png

![alt text](img/DARIN.CR2.png?raw=true "a sample of cr22png cli output")
![alt text](img/SARA.CR2.png?raw=true "a sample of cr22png cli output")
![alt text](img/DEXTER.CR2.png?raw=true "a sample of cr22png cli output")
![alt text](img/CRYSTAL.CR2.png?raw=true "a sample of cr22png cli output")
![alt text](img/GALFREY.CR2.png?raw=true "a sample of cr22png cli output")

# itemicondat2png

**Support:** VERGE1 only (16x16, N tiles, 20 columns)

Usage:

- node src/cli/itemicondat2png.js data/VERGE.PAL data/ITEMICON.DAT

Output:

- data/ITEMICON.DAT.png

![alt text](img/ITEMICON.DAT.png?raw=true "a sample of itemicondat2png cli output")

# miscicondat2png

**Support:** VERGE1 only (16x16, 24x24, 24x40)

Usage:

- node src/cli/miscicondat2png.js data/VERGE.PAL data/MISCICON.DAT

Output:

- data/MISCICON.DAT.png

![alt text](img/MISCICON.DAT.png?raw=true "a sample of miscicondat2png cli output")

# pcx2png

Usage:

- node src/cli/pcx2png.js data/STAN.PCX

Output:

- data/STAN.PCX.png

![alt text](img/pcx2png-example1.png?raw=true "a sample of pcx2png cli output")
![alt text](img/pcx2png-example2.png?raw=true "a sample of pcx2png cli output")
![alt text](img/pcx2png-example5.png?raw=true "a sample of pcx2png cli output")

# itemsdat2json

**Support:** VERGE1 only

Usage:

- node src/cli/itemsdat2json.js data/ITEMS.DAT

Output:

- data/ITEMS.DAT.json

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

# equipdat2json

**Support:** VERGE1 only

Usage:

- node src/cli/equipdat2json.js data/EQUIP.DAT

Output:

- data/EQUIP.DAT.json

**Note:** Output here is abbreviated and pretty-printed for readability.

```json
{
  "numitems": 33,
  "equip": [
    {
      "comments": [
        "// Dagger"
      ],
      "str": 5,
      "equipable": [
        1,
        2,
        3,
        4,
        5
      ]
    },
    {
      "comments": [
        "// Short Sword"
      ],
      "str": 22,
      "equipable": [
        1,
        5
      ]
    },
    {
      "comments": [
        "// Wand"
      ],
      "str": 3,
      "mag": 5,
      "equipable": [
        3,
        4
      ]
    },
    ...
  ]
}
```

# partydat2json

**Support:** VERGE1 only

Usage:

- node src/cli/partydat2json.js data/PARTY.DAT

Output:

- data/PARTY.DAT.json

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

# TODO

- kildorf | aen: if you could output a json file describing the animation data (etc.) that'd be pretty sweet
- more VERGE1-related formats
  - PARTY.DAT
  - TRANS.TBL
  - compiled scripts: EFFECTS.VCS, STARTUP.VCS, etc.
  - save games
- VERGE2 formats
- VERGE3 formats
