# VERGE3 Command-Line Tools

## v3chr2gif

**Support:** VERGE3 only (WxH, N frames)

Usage:

- `node src/cli/v3chr2gif.js data/v1/VERGE.PAL data/v3/sully.chr`

Output:

- `data/v3/sully.chr-anim0.png`
- `data/v3/sully.chr-anim1.png`
- `data/v3/sully.chr-anim2.png`
- `data/v3/sully.chr-anim3.png`
- `data/v3/sully.chr-anim4.png`
- `data/v3/sully.chr-anim5.png`
- `data/v3/sully.chr-anim6.png`
- `data/v3/sully.chr-anim7.png`

![alt text](/img/v3/sully.chr-anim0.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/sully.chr-anim1.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/sully.chr-anim2.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/sully.chr-anim3.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/sully.chr-anim4.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/sully.chr-anim5.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/sully.chr-anim6.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/sully.chr-anim7.gif?raw=true "a sample of v3chr2gif cli output")

![alt text](/img/v3/lil_stan.chr-anim0.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/lil_stan.chr-anim1.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/lil_stan.chr-anim2.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/lil_stan.chr-anim3.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/lil_stan.chr-anim4.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/lil_stan.chr-anim5.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/lil_stan.chr-anim6.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/lil_stan.chr-anim7.gif?raw=true "a sample of v3chr2gif cli output")

![alt text](/img/v3/stan.chr-anim0.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/stan.chr-anim1.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/stan.chr-anim2.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/stan.chr-anim3.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/stan.chr-anim4.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/stan.chr-anim5.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/stan.chr-anim6.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/stan.chr-anim7.gif?raw=true "a sample of v3chr2gif cli output")

![alt text](/img/v3/sprite_kiel1.chr-anim0.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/sprite_kiel1.chr-anim1.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/sprite_kiel1.chr-anim2.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/sprite_kiel1.chr-anim3.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/sprite_kiel1.chr-anim4.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/sprite_kiel1.chr-anim5.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/sprite_kiel1.chr-anim6.gif?raw=true "a sample of v3chr2gif cli output")
![alt text](/img/v3/sprite_kiel1.chr-anim7.gif?raw=true "a sample of v3chr2gif cli output")

## v3chr2json

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

## v3chr2png

**Support:** VERGE3 only (WxH, N frames, 5 columns)

Usage:

- `node src/cli/v3chr2png.js data/v3/sully.chr`

Output:

- `data/v3/sully.chr.png`

![alt text](/img/v3/sully.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/bubba.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/crystal.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/darin.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/darin2.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/darin3.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/darin4.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/darin5.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/darin6.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/darin7.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/darin8.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/darin9.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/dexter.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/galfrey.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/kadan.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/lil_stan.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/sara.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/stan.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/vorn.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/walker01.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/walker02.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/walker03.chr.png?raw=true "a sample of v3chr2png cli output")
![alt text](/img/v3/walker04.chr.png?raw=true "a sample of v3chr2png cli output")

## v3chr2pnglist

**Support:** VERGE3 only (WxH, N frames, 5 columns)

Usage:

- `node src/cli/v3chr2pnglist.js data/v3/sully.chr`

Output:

- `data/v3/sully.chr-0.png` .. `data/v3/sully.chr-` (N - 1) `.png`

![alt text](/img/v3/sully.chr-0.png?raw=true "a sample of v3chr2pnglist cli output")
![alt text](/img/v3/sully.chr-1.png?raw=true "a sample of v3chr2pnglist cli output")
![alt text](/img/v3/sully.chr-2.png?raw=true "a sample of v3chr2pnglist cli output")
![alt text](/img/v3/sully.chr-3.png?raw=true "a sample of v3chr2pnglist cli output")
![alt text](/img/v3/sully.chr-4.png?raw=true "a sample of v3chr2pnglist cli output")
![alt text](/img/v3/sully.chr-5.png?raw=true "a sample of v3chr2pnglist cli output")
![alt text](/img/v3/sully.chr-6.png?raw=true "a sample of v3chr2pnglist cli output")
![alt text](/img/v3/sully.chr-7.png?raw=true "a sample of v3chr2pnglist cli output")

## v3map2json

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
  "scriptOffset": 11864,
  "description": "Undersea",
  "vspFilename": "HAHN01.VSP",
  "musicname": "",
  "renderString": "1,E,2,R",
  "startupScript": "start",
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

## v3vsp2png

Converts a VERGE3 tileset to a single 32-bit PNG sprite sheet.

**Support:** VERGE3 only (16x16, N tiles, 20 columns)

Usage:

- `node src/cli/v3vsp2png.js data/v3/intro.vsp`

Output:

- `data/v3/intro.vsp.png`

![alt text](/img/v3/intro.vsp.png?raw=true "a sample of v3vsp2png cli output")

![alt text](/img/v3/HAHN01.VSP.png?raw=true "a sample of v3vsp2png cli output")

## v3vspob2png

This cli outputs the tile obstruction data inside VERGE3 VSP files. It follows the same layout as `v3vsp2png`.

**Support:** VERGE3 only (16x16, N tiles, 20 columns)

Usage:

- `node src/cli/v3vspob2png.js data/v3/HAHN01.VSP`

Output:

- `data/v3/HAHN01.VSP-obstructions.png`

![alt text](/img/v3/HAHN01.VSP-obstructions.png?raw=true "a sample of v3vspob2png cli output")

