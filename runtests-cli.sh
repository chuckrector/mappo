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
node src/cli/partydat2json.js data/PARTY.DAT
node src/cli/map2json.js data/ISLAND.MAP
node src/cli/transtbl2json.js data/TRANS.TBL
node src/cli/v2map2json.js data/v2/v2world.map
node src/cli/v2vsp2pal.js data/v2/GRUE0041.VSP
node src/cli/v2chr2png.js data/v2/VERGE2.PAL data/v2/VECNA.CHR
node src/cli/v2vsp2png.js data/v2/GRUE0041.VSP
