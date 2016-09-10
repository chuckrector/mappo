#!/bin/bash

set -e

node src/cli/pcx2png.js data/v1/STAN.PCX
node src/cli/v1boxraw2png.js data/v1/VERGE.PAL data/v1/BOX.RAW
node src/cli/v1chr2json.js data/v1/VERGE.PAL data/v1/DARIN.CHR
node src/cli/v1chr2png.js data/v1/VERGE.PAL data/v1/DARIN.CHR
node src/cli/v1chr2pnglist.js data/v1/VERGE.PAL data/v1/DARIN.CHR
node src/cli/v1cr22png.js data/v1/VERGE.PAL data/v1/DARIN.CR2
node src/cli/v1equipdat2json.js data/v1/EQUIP.DAT
node src/cli/v1itemicondat2png.js data/v1/VERGE.PAL data/v1/ITEMICON.DAT
node src/cli/v1itemsdat2json.js data/v1/ITEMS.DAT
node src/cli/v1mainfnt2png.js data/v1/VERGE.PAL data/v1/MAIN.FNT
node src/cli/v1map2json.js data/v1/ISLAND.MAP
node src/cli/v1miscicondat2png.js data/v1/VERGE.PAL data/v1/MISCICON.DAT
node src/cli/v1partydat2json.js data/v1/PARTY.DAT
node src/cli/v1smallfnt2png.js data/v1/VERGE.PAL data/v1/SMALL.FNT
node src/cli/v1speechspc2png.js data/v1/VERGE.PAL data/v1/SPEECH.SPC
node src/cli/v1transtbl2json.js data/v1/TRANS.TBL
node src/cli/v1vsp2png.js data/v1/HAHN01.VSP
node src/cli/v2chr2json.js data/v2/VERGE2.PAL data/v2/VECNA.CHR
node src/cli/v2chr2png.js data/v2/VERGE2.PAL data/v2/VECNA.CHR
node src/cli/v2chr2pnglist.js data/v2/VERGE2.PAL data/v2/VECNA.CHR
node src/cli/v2map2json.js data/v2/v2world.map
node src/cli/v2vsp2pal.js data/v2/GRUE0041.VSP
node src/cli/v2vsp2png.js data/v2/GRUE0041.VSP
node src/cli/v3chr2json.js data/v3/sully.chr
node src/cli/v3chr2png.js data/v3/sully.chr
node src/cli/v3chr2pnglist.js data/v3/sully.chr
node src/cli/v3map2json.js data/v3/undersea.map
node src/cli/v3vsp2png.js data/v3/intro.vsp
node src/cli/v3vspob2png.js data/v3/HAHN01.VSP
