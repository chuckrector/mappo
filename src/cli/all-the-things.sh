#!/bin/bash

./node_modules/.bin/concurrently -m 4 --raw --kill-others \
"bash src/cli/cli-all-x.sh data/v1 *.pcx src/cli/pcx2png.js " \
"bash src/cli/cli-all-x.sh data/v1 *.raw src/cli/v1boxraw2png.js data/v1/VERGE.PAL " \
"bash src/cli/cli-all-x.sh data/v1 *.chr src/cli/v1chr2gif.js data/v1/VERGE.PAL " \
"bash src/cli/cli-all-x.sh data/v1 *.chr src/cli/v1chr2json.js data/v1/VERGE.PAL " \
"bash src/cli/cli-all-x.sh data/v1 *.chr src/cli/v1chr2png.js data/v1/VERGE.PAL " \
"bash src/cli/cli-all-x.sh data/v1 *.chr src/cli/v1chr2pnglist.js data/v1/VERGE.PAL " \
"bash src/cli/cli-all-x.sh data/v1 *.cr2 src/cli/v1cr22png.js data/v1/VERGE.PAL " \
"bash src/cli/cli-all-x.sh data/v1 equip.dat src/cli/v1equipdat2json.js " \
"bash src/cli/cli-all-x.sh data/v1 itemicon.dat src/cli/v1itemicondat2png.js data/v1/VERGE.PAL" \
"bash src/cli/cli-all-x.sh data/v1 items.dat src/cli/v1itemsdat2json.js " \
"bash src/cli/cli-all-x.sh data/v1 main.fnt src/cli/v1mainfnt2png.js data/v1/VERGE.PAL " \
"bash src/cli/cli-all-x.sh data/v1 *.map src/cli/v1map2json.js " \
"bash src/cli/cli-all-x.sh data/v1 main.fnt src/cli/v1mainfnt2png.js data/v1/VERGE.PAL " \
"bash src/cli/cli-all-x.sh data/v1 miscicon.dat src/cli/v1miscicondat2png.js data/v1/VERGE.PAL " \
"bash src/cli/cli-all-x.sh data/v1 party.dat src/cli/v1partydat2json.js " \
"bash src/cli/cli-all-x.sh data/v1 small.fnt src/cli/v1smallfnt2png.js data/v1/VERGE.PAL " \
"bash src/cli/cli-all-x.sh data/v1 speech.spc src/cli/v1speechspc2png.js data/v1/VERGE.PAL " \
"bash src/cli/cli-all-x.sh data/v1 trans.tbl src/cli/v1transtbl2json.js " \
"bash src/cli/cli-all-x.sh data/v1 *.vsp src/cli/v1vsp2png.js " \
"bash src/cli/cli-all-x.sh data/v2 *.chr src/cli/v2chr2gif.js data/v1/VERGE.PAL " \
"bash src/cli/cli-all-x.sh data/v2 *.chr src/cli/v2chr2json.js data/v1/VERGE.PAL " \
"bash src/cli/cli-all-x.sh data/v2 *.chr src/cli/v2chr2png.js data/v1/VERGE.PAL " \
"bash src/cli/cli-all-x.sh data/v2 *.chr src/cli/v2chr2pnglist.js data/v1/VERGE.PAL " \
"bash src/cli/cli-all-x.sh data/v2 *.map src/cli/v2map2json.js " \
"bash src/cli/cli-all-x.sh data/v2 *.vsp src/cli/v2vsp2png.js " \
"bash src/cli/cli-all-x.sh data/v3 *.chr src/cli/v3chr2gif.js data/v1/VERGE.PAL " \
"bash src/cli/cli-all-x.sh data/v3 *.chr src/cli/v3chr2json.js " \
"bash src/cli/cli-all-x.sh data/v3 *.chr src/cli/v3chr2png.js " \
"bash src/cli/cli-all-x.sh data/v3 *.chr src/cli/v3chr2pnglist.js " \
"bash src/cli/cli-all-x.sh data/v3 *.map src/cli/v3map2json.js " \
"bash src/cli/cli-all-x.sh data/v3 *.vsp src/cli/v3vsp2png.js " \
"bash src/cli/cli-all-x.sh data/v3 *.vsp src/cli/v3vspob2png.js" \
"bash src/cli/cli-all-x.sh data/v1 *.map src/cli/map2tmx.js" \
"bash src/cli/cli-all-x.sh data/v2 *.map src/cli/map2tmx.js" \
"bash src/cli/cli-all-x.sh data/v3 *.map src/cli/map2tmx.js"
