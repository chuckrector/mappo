# Requirements

- Node >= 5.10.0

# Installation

1. npm install
2. npm start

# chr2png

**Support:** VERGE1 only

Usage:

- node chr2png.js data/VERGE.PAL data/DARIN.CHR

Output:

- data/DARIN.CHR.png

![alt text](chr2png-example.png?raw=true "a sample of chr2png cli output")

# vsp2png

**Support:** VERGE1 only

Usage:

- node vsp2png.js data/HAHN01.VSP

Output:

- data/HAHN01.VSP.png

![alt text](vsp2png-example.png?raw=true "a sample of vsp2png cli output")

# smallfnt2png

**Support:** VERGE1 only (7x9, 95 tiles, 19 columns)

Usage:

- node smallfnt2png.js data/VERGE.PAL data/SMALL.FNT

Output:

- data/SMALL.FNT.png

![alt text](smallfnt2png-example.png?raw=true "a sample of smallfnt2png cli output")

# mainfnt2png

**Support:** VERGE1 only (9x16, 95 tiles, 19 columns)

Usage:

- node mainfnt2png.js data/VERGE.PAL data/MAIN.FNT

Output:

- data/MAIN.FNT.png

![alt text](mainfnt2png-example.png?raw=true "a sample of mainfnt2png cli output")

# boxraw2png

**Support:** VERGE1 only (320x66)

Usage:

- node boxraw2png.js data/VERGE.PAL data/BOX.RAW

Output:

- data/BOX.RAW.png

![alt text](boxraw2png-example.png?raw=true "a sample of boxraw2png cli output")

# TODO

- kildorf | aen: if you could output a json file describing the animation data (etc.) that'd be pretty sweet
- more VERGE1-related formats
  - SPEECH.SPC
  - ITEMICON.DAT
  - ITEMS.DAT
  - MISCICON.DAT
  - EQUIP.DAT
  - PARTY.DAT
  - STARTUP.SCR
  - TRANS.TBL
  - compiled scripts: EFFECTS.VCS, STARTUP.VCS, etc.
  - save games
  - PCX