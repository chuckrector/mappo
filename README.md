# mappo v0.17.0

Currently, a collection of command-line tools which can load and convert various [VERGE](http://verge-rpg.com/) file formats. The skeleton of an Electron app is also included. After I've written loaders and converters for all known VERGE file formats, I'll start building a map editor in the Electron app.

# Why?

Grue showed me his cool [maped4](https://github.com/mcgrue/maped4) project. It exploded when I tried to use it, so I created this project to isolate the issues and understand why. Node and Electron and VERGE are cool, so I kept going. It's a fun way to probe unfamiliar territory (Node and Electron) with a familiar face (VERGE).

In ancient times, I worked on my own map editor. http://chuckrector.com/old/ So, I have a soft spot. Partly, this project is about "Can I do what I once did more easily?" Partly, it's also about "How much more powerful am I now?"

```
Triplefox | what is the plan for the loaders? just to have everything in json?
     @aen | binary formats can be viewed as a bit of a barrier
     @aen | conversion to json/png/whatever simply lowers that barrier
     @aen | and allows us all to stripmine everything
```

# Learnings

- The `jquery-ui` npm package sucks. If you want jQuery UI in Node, directly package it.

# Requirements

- Node >= 5.10.0

# Installation

1. git clone https://github.com/chuckrector/mappo.git
2. cd mappo
3. npm install
4. npm start

# Supported File Formats

What does support mean? Currently, at least one loader. Optionally, one or more converters.

 | VERGE1 | VERGE2 | VERGE3
--- |:---:|:---:|:---:
PCX          | ✓ | ✓ | ✓
BOX.RAW      | ✓ | n/a | n/a
CHR          | ✓ | ✓ | ✓
CR2          | ✓ | n/a | n/a
EQUIP.DAT    | ✓ | n/a | n/a
ITEMICON.DAT | ✓ | n/a | n/a
ITEMS.DAT    | ✓ | n/a | n/a
MAIN.FNT     | ✓ | n/a | n/a
MAP          | ✓ | ✓ | ✓
MISCICON.DAT | ✓ | n/a | n/a
PAL          | ✓ | n/a | n/a
PARTY.DAT    | ✓ | n/a | n/a
SMALL.FNT    | ✓ | n/a | n/a
SPEECH.SPC   | ✓ | n/a | n/a
TRANS.TBL    | ✓ | ✓ | n/a
VSP          | ✓ | ✓ | ✓
VC           | ✗ | ✗ | ✗
VCS          | ✗ | ✗ | n/a
save games   | ✗ | n/a | n/a

# pcx2png

Usage:

- `node src/cli/pcx2png.js data/STAN.PCX`

Output:

- `data/STAN.PCX.png`

![alt text](img/STAN.PCX.png?raw=true "a sample of pcx2png cli output")
![alt text](img/VERGE1.PCX.png?raw=true "a sample of pcx2png cli output")
![alt text](img/VERGE320.PCX.png?raw=true "a sample of pcx2png cli output")

# v1boxraw2png

**Support:** VERGE1 only (320x66)

Usage:

- `node src/cli/v1boxraw2png.js data/v1/VERGE.PAL data/v1/BOX.RAW`

Output:

`data/v1/BOX.RAW.png`

![alt text](img/BOX.RAW.png?raw=true "a sample of v1boxraw2png cli output")

# v1chr2json

**Support:** VERGE1 only

Usage:

- `node src/cli/v1chr2json.js data/v1/VERGE.PAL data/v1/DARIN.CHR`

Output:

- `data/v1/DARIN.CHR.json`

```json
{
  "chrs": [0, 0, 0, 0, 0, 0, 0, 0, 0, ...],
  "palette": [0, 0, 0, 2, 2, 2, 3, 3, 3, ...]
}
```

# v1chr2png

**Support:** VERGE1 only

Usage:

- `node src/cli/v1chr2png.js data/v1/VERGE.PAL data/v1/DARIN.CHR`

Output:

- `data/v1/DARIN.CHR.png`

![alt text](img/DARIN.CHR.png?raw=true "a sample of v1chr2png cli output")
![alt text](img/SARA.CHR.png?raw=true "a sample of v1chr2png cli output")
![alt text](img/CRYSTAL.CHR.png?raw=true "a sample of v1chr2png cli output")
![alt text](img/DEXTER.CHR.png?raw=true "a sample of v1chr2png cli output")
![alt text](img/GALFREY.CHR.png?raw=true "a sample of v1chr2png cli output")
![alt text](img/BUBBA.CHR.png?raw=true "a sample of v1chr2png cli output")
![alt text](img/STAN.CHR.png?raw=true "a sample of v1chr2png cli output")

# v1chr2pnglist

**Support:** VERGE1 only

Usage:

- `node src/cli/v1chr2png.js data/v1/VERGE.PAL data/v1/DARIN.CHR`

Output:

- `data/v1/DARIN.CHR-0.png` .. `data/v1/DARIN.CHR-29.png`

![alt text](img/v1/DARIN.CHR-0.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-1.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-2.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-3.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-4.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-5.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-6.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-7.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-8.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-9.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-10.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-11.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-12.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-13.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-14.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-15.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-16.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-17.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-18.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-19.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-20.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-21.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-22.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-23.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-24.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-25.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-26.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-27.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-28.png?raw=true "a sample of v1chr2pnglist cli output")
![alt text](img/v1/DARIN.CHR-29.png?raw=true "a sample of v1chr2pnglist cli output")


# v1cr22png

**Support:** VERGE1 only (96x96)

Usage:

- `node src/cli/v1cr22png.js data/v1/VERGE.PAL data/v1/CRYSTAL.CR2`

Output:

- `data/v1/CRYSTAL.CR2.png`

![alt text](img/DARIN.CR2.png?raw=true "a sample of v1cr22png cli output")
![alt text](img/SARA.CR2.png?raw=true "a sample of v1cr22png cli output")
![alt text](img/DEXTER.CR2.png?raw=true "a sample of v1cr22png cli output")
![alt text](img/CRYSTAL.CR2.png?raw=true "a sample of v1cr22png cli output")
![alt text](img/GALFREY.CR2.png?raw=true "a sample of v1cr22png cli output")

# v1equipdat2json

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

# v1itemicondat2png

**Support:** VERGE1 only (16x16, N tiles, 20 columns)

Usage:

- `node src/cli/v1itemicondat2png.js data/VERGE.PAL data/ITEMICON.DAT`

Output:

- `data/ITEMICON.DAT.png`

![alt text](img/ITEMICON.DAT.png?raw=true "a sample of v1itemicondat2png cli output")

# v1itemsdat2json

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
    "itemtype": 1,
    "equipflag": 0,
    "equipidx": 0,
    "itmprv": 0,
    "price": 300
  }, ...]
}
```

# v1mainfnt2png

**Support:** VERGE1 only (9x16, 95 tiles, 19 columns)

Usage:

- `node src/cli/v1mainfnt2png.js data/v1/VERGE.PAL data/v1/MAIN.FNT`

Output:

- `data/v1/MAIN.FNT.png`

![alt text](img/MAIN.FNT.png?raw=true "a sample of v1mainfnt2png cli output")

# v1map2json

**Support:** VERGE1 only

Usage:

- `node src/cli/v1map2json.js data/v1/ISLAND.MAP`

Output:

- `data/v1/ISLAND.MAP.json`

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

# v1miscicondat2png

**Support:** VERGE1 only (16x16, 24x24, 24x40)

Usage:

- `node src/cli/v1miscicondat2png.js data/v1/VERGE.PAL data/v1/MISCICON.DAT`

Output:

- `data/v1/MISCICON.DAT.png`

![alt text](img/MISCICON.DAT.png?raw=true "a sample of v1miscicondat2png cli output")

# v1partydat2json

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

# v1smallfnt2png

**Support:** VERGE1 only (7x9, 95 tiles, 19 columns)

Usage:

- `node src/cli/v1smallfnt2png.js data/v1/VERGE.PAL data/v1/SMALL.FNT`

Output:

- `data/v1/SMALL.FNT.png`

![alt text](img/SMALL.FNT.png?raw=true "a sample of v1smallfnt2png cli output")

# v1speechspc2png

**Support:** VERGE1 only (32x32, N tiles, 10 columns)

Usage:

- `node src/cli/v1speechspc2png.js data/v1/VERGE.PAL data/v1/SPEECH.SPC`

Output:

- `data/v1/SPEECH.SPC.png`

![alt text](img/SPEECH.SPC.png?raw=true "a sample of v1speechspc2png cli output")

# v1transtbl2json

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

# v1vsp2png

**Support:** VERGE1 only (16x16, N tiles, 20 columns)

Usage:

- `node src/cli/v1vsp2png.js data/v1/HAHN01.VSP`

Output:

- `data/v1/HAHN01.VSP.png`

![alt text](img/HAHN01.VSP.png?raw=true "a sample of v1vsp2png cli output")

# v2chr2json

**Support:** VERGE2 only

Usage:

- `node src/cli/v2chr2json.js data/v2/VERGE2.PAL data/v2/VECNA.CHR`

Output:

- `data/v2/VECNA.CHR.json`

```json

{
  "version": 2,
  "fxsize": 16,
  "fysize": 32,
  "hx": 0,
  "hy": 16,
  "hw": 16,
  "hh": 16,
  "totalframes": 30,
  "imagedata": {
    "bufsize": 12494,
    "compressed": [255, 5, 0, ...],
    "decompressed": [0, 0, 0, ...]
  }
  "lidle": 15,
  "ridle": 10,
  "uidle": 5,
  "didle": 0,
  "lanimLength": 49,
  "lanim": "F16W10F17W10F16W10F15W10F18W10F19W10F18W10F15W10",
  "ranimLength": 49,
  "ranim": "F11W10F12W10F11W10F10W10F13W10F14W10F13W10F10W10",
  "uanimLength": 41,
  "uanim": "F6W10F7W10F6W10F5W10F8W10F9W10F8W10F5W10",
  "danimLength": 41,
  "danim": "F1W10F2W10F1W10F0W10F3W10F4W10F3W10F0W10",
  "palette": [0, 0, 0, 3, 3, 3, 7, 7, 7, ...]
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

# v2chr2pnglist

See `v2vsp2pal` for details on how to generate `VERGE2.PAL`.

**Support:** VERGE2 only (WxH, N tiles, 5 columns)

Usage:

- `node src/cli/v2chr2pnglist.js data/v2/VERGE2.PAL data/v2/VECNA.CHR`

Output:

- `data/v2/VECNA.CHR-0.png` .. `data/v2/VECNA.CHR-` (N - 1) `.png`

![alt text](img/v2/VECNA.CHR-0.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-1.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-2.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-3.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-4.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-5.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-6.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-7.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-8.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-9.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-10.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-11.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-12.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-13.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-14.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-15.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-16.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-17.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-18.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-19.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-20.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-21.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-22.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-23.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-24.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-25.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-26.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-27.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-28.png?raw=true "a sample of v2chr2pnglist cli output")
![alt text](img/v2/VECNA.CHR-29.png?raw=true "a sample of v2chr2pnglist cli output")

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

**Support:** VERGE2 only (16x16, N tiles, 20 columns)

Usage:

- `node src/cli/v2vsp2png.js data/v2/RUINS.VSP`

Output:

- `data/v2/RUINS.VSP.png`

![alt text](img/RUINS.VSP.png?raw=true "a sample of v2vsp2png cli output")
![alt text](img/SULLY2A.VSP.png?raw=true "a sample of v2vsp2png cli output")

# v3chr2json

**Support:** VERGE3 only

Usage:

- `node src/cli/v3chr2json.js data/v3/sully.chr`

Output:

- `data/v3/sully.chr.json`

```json
{
  "signature": 5392451,
  "version": 5,
  "bpp": 24,
  "flags": 0,
  "tcol": 16711935,
  "hx": 0,
  "hy": 7,
  "hw": 15,
  "hh": 10,
  "fxsize": 16,
  "fysize": 16,
  "totalframes": 8,
  "didle": 1,
  "uidle": 6,
  "lidle": 0,
  "ridle": 2,
  "anims": [{
    "length": 32,
    "animbuf": "F0W5F1W5F2W5F3W5F4W5F5W5F6W5F7W5"
  }, {
    "length": 32,
    "animbuf": "F0W5F1W5F2W5F3W5F4W5F5W5F6W5F7W5"
  }, {
    "length": 32,
    "animbuf": "F0W5F1W5F2W5F3W5F4W5F5W5F6W5F7W5"
  }, ...],
  "customscripts": 0,
  "compression": 1,
  "imagedata": {
    "mysize": 6144,
    "comprLen": 425,
    "compressed": [120, 156, 237, ...],
    "decompressed": [255, 0, 255, ...],
  }
}
```

# v3chr2png

**Support:** VERGE3 only (WxH, N frames, 5 columns)

Usage:

- `node src/cli/v3chr2png.js data/v3/sully.chr`

Output:

- `data/v3/sully.chr.png`

![alt text](img/v3/sully.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/bubba.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/crystal.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/darin.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/darin2.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/darin3.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/darin4.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/darin5.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/darin6.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/darin7.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/darin8.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/darin9.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/dexter.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/galfrey.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/kadan.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/lil_stan.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/sara.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/stan.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/vorn.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/walker01.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/walker02.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/walker03.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](img/v3/walker04.chr.png?raw=true "a sample of v3chr2png cli output")

# v3chr2pnglist

**Support:** VERGE3 only (WxH, N frames, 5 columns)

Usage:

- `node src/cli/v3chr2pnglist.js data/v3/sully.chr`

Output:

- `data/v3/sully.chr-0.png` .. `data/v3/sully.chr-` (N - 1) `.png`

![alt text](img/v3/sully.chr-0.png?raw=true "a sample of v3chr2pnglist cli output")
![alt text](img/v3/sully.chr-1.png?raw=true "a sample of v3chr2pnglist cli output")
![alt text](img/v3/sully.chr-2.png?raw=true "a sample of v3chr2pnglist cli output")
![alt text](img/v3/sully.chr-3.png?raw=true "a sample of v3chr2pnglist cli output")
![alt text](img/v3/sully.chr-4.png?raw=true "a sample of v3chr2pnglist cli output")
![alt text](img/v3/sully.chr-5.png?raw=true "a sample of v3chr2pnglist cli output")
![alt text](img/v3/sully.chr-6.png?raw=true "a sample of v3chr2pnglist cli output")
![alt text](img/v3/sully.chr-7.png?raw=true "a sample of v3chr2pnglist cli output")

# v3map2json

**Support:** VERGE3 only

Usage:

- `node src/cli/v3map2json.js data/v3/undersea.map`

Output:

- `data/v3/undersea.map.json`

**Note:** Output here is abbreviated and pretty-printed for readability.

```json
{
  "signature": "V3MAP",
  "version": 2,
  "scriptoffset": 11864,
  "mapname": "Undersea",
  "vspname": "HAHN01.VSP",
  "musicname": "",
  "renderstring": "1,E,2,R",
  "startupscript": "start",
  "startx": 13,
  "starty": 2,
  "numlayers": 2,
  "layers": [{
    "layername": "Layer 0",
    "parallax_x": 1,
    "parallax_y": 1,
    "width": 58,
    "height": 36,
    "lucent": 0,
    "tiledata": {
      "mysize": 4176,
      "comprLen": 394,
      "compressed": [120, 156, 237, ...],
      "decompressed": [48, 0, 48, ...],
    }
  }, ...],
  "obslayer": {
    "mysize": 2088,
    "comprLen": 284,
    "compressed": [120, 156, 237, ...],
    "decompressed": [2, 2, 2, ...],
  },
  "zonelayer": {
    "mysize": 4176,
    "comprLen": 102,
    "compressed": [120, 156, 237, ...],
    "decompressed": [0, 0, 0, ...],
  },
  "numzones": 17,
  "zones": [{
    "name": "Default",
    "script": "",
    "percent": 20,
    "delay": 8,
    "method": 0
  }, ...],
  "mapentities": 0,
  "entity": [{
    "x1": 23,
    "y1": 11,
    "face": 2,
    "obstructable": 1,
    "obstruction": 1,
    "autoface": 1,
    "speed": 100,
    "speedct": 0,
    "delayct": 0,
    "wx1": 0,
    "wy1": 0,
    "wx2": 0,
    "wy2": 0,
    "wdelay": 0,
    "maybeOffset": 0,
    "movescript": "",
    "chrname": "res\\chrs\\Vorn.chr",
    "description": "Villager A",
    "script": "ent0"
  }, ...],
  "script": [0, 0, 0, ...],
}
```

# v3vsp2png

**Support:** VERGE3 only (16x16, N tiles, 20 columns)

Usage:

- `node src/cli/v3vsp2png.js data/v3/intro.vsp`

Output:

- `data/v3/intro.vsp.png`

![alt text](img/v3/intro.vsp.png?raw=true "a sample of v3vsp2png cli output")

![alt text](img/v3/HAHN01.VSP.png?raw=true "a sample of v3vsp2png cli output")

# v3vspob2png (16x16, N tiles, 20 columns)

This cli outputs the tile obstruction data inside VERGE3 VSP files. It follows the same layout as `v3vsp2png`.

**Support:** VERGE3 only

Usage:

- `node src/cli/v3vspob2png.js data/v3/HAHN01.VSP`

Output:

- `data/v3/HAHN01.VSP-obstructions.png`

![alt text](img/v3/HAHN01.VSP-obstructions.png?raw=true "a sample of v3vspob2png cli output")

# TODO

- kildorf | aen: if you could output a json file describing the animation data (etc.) that'd be pretty sweet
- kildorf | you could even output actual animated gifs
- json pretty printer that abbreviates long lists with ellipses
- support for conditional blocks in declarative parser (e.g. EQUIP.DAT)
- automatically run all cli as part of tests, rather than manually adding to shell script every time i make a new one. how? maybe default params in each cli and let normal js test runner drive everything
- proper npm package?
- shorthand for `filler(N, v)`, e.g. `filler(N, v)`
- `v*vsp2pnglist`? maybe overkill?
- recursive version detection & inspection of all formats
- fallbacks for loaders and converters? e.g. v2 supports v1 chrs. tricky, since formats are different and may have different requirements, e.g. v3 tiles 24- or 32-bit whereas easlier engine tiles all 8-bit, so cli to convert would need additional palette parameter in that case
- unify all cli into non-prefixed; should figure it out themselves

