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
node src/cli/itemicondat2png.js data/VERGE.PAL data/ITEMICON.DAT
node src/cli/miscicondat2png.js data/VERGE.PAL data/MISCICON.DAT
node src/cli/itemsdat2json.js data/ITEMS.DAT
node src/cli/equipdat2json.js data/EQUIP.DAT