#!/bin/bash

set -e

node src/cli/boxraw2png.js data/VERGE.PAL data/BOX.RAW
node src/cli/chr2png.js data/VERGE.PAL data/DARIN.CHR
node src/cli/cr22png.js data/VERGE.PAL data/DARIN.CR2
node src/cli/mainfnt2png.js data/VERGE.PAL data/MAIN.FNT
node src/cli/pcx2png.js data/STAN.PCX
node src/cli/smallfnt2png.js data/VERGE.PAL data/SMALL.FNT
node src/cli/speechspc2png.js data/VERGE.PAL data/SPEECH.SPC
node src/cli/vsp2png.js data/HAHN01.VSP
