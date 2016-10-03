## 0.30.0 (Oct 1, 2016)

- fix false positives on v1itemicondat file format detection
- if loading .VSP tileset fails, attempt with uppercase filename
- fix broken rendering due to some maps referencing non-existent layers

## 0.29.0 (Sep 27, 2016)

- hold ALT and drag mouse to scroll viewport
- click map viewport to plot tile

## 0.28.0 (Sep 26, 2016)

- map2tmx cli

## 0.27.0 (Sep 25, 2016)

- zoom tileset in sync with map viewport
- show tile highlight over hovered tiles in map viewport & tile selector

## 0.26.0 (Sep 24, 2016)

- draw map layers in correct order
- limit map zoom to: 0.25x, 0.5x, 0.75x, 1x-10x
- added map filename tooltips
- fix bug where right panel shrunk when resizing window bigger/smaller
- fix mappo not working in Windows (tested Windows 10)
- show list of map layers by name
- added ability to toggle layer visibility by clicking layer name

## 0.25.0 (Sep 23, 2016)

- show all maps in launch folder (even subfolders)
- click any V1/V2/V3 map to load it
- fix bug in v1map format detection (looked for `.chr` instead of `.vsp` in header)
- fix bug in v2vsp format detection (accept version 3)

## 0.24.0 (Sep 22, 2016)

- allow viewport dragging to continue after moving outside and back into the window
- prevent auto scrolling from triggering while outside the window

## 0.23.0 (Sep 21, 2016)

- inverted color tile highlight
- file format detection cli
- fix bug where you couldn't drag viewport in fine increments
- fix bug with tile highlight jittering due to subpixel camera position

## 0.22.1 (Sep 20, 2016)

- fix bug where arrow keys would keep scrolling viewport after release
- fix bug with dim palettes in v2vsp2png
- fix broken arrow key movement
- fix bug where auto scroll would continue after moving outside viewport
- fix subpixel tile highlight rendering bug

## 0.22.0 (Sep 19, 2016)

- v1map rendering
- scroll viewport with arrow keys
- drag viewport with mouse
- autoscroll viewport when mouse is near edges

## 0.21.0 (Sep 18, 2016)

- json abbreviator

## 0.20.0 (Sep 17, 2016)

- format detection
  - v1boxraw
  - v1chr
  - v1pal
  - v1cr2
  - v1mainfnt
  - v1smallfnt
  - v1transtbl
  - v1speechspc
  - v1itemicondat
  - v1miscicondat
  - v1vsp
  - v1map
  - v2chr
  - v2vsp
  - v2kjchr
  - v2map
  - v3chr
  - v3vsp
  - v3map
- v2kjchr2json cli
- v2kjchr2png cli
- v2kjchr2pnglist cli
- v2kjchr2gif cli

## 0.19.0 (Sep 15, 2016)

- v3chr2gif cli

## 0.18.0 (Sep 14, 2016)

- v1chr2gif cli
- v2chr2gif cli

## 0.17.0 (Sep 10, 2016)

- tile ripper
- v1chr2pnglist cli
- v2chr2pnglist cli
- v3chr2pnglist cli

## 0.16.0 (Sep 9, 2016)

- v1chr2json cli
- v2chr2json cli
- v3chr2json cli

## 0.15.2 (Sep 9, 2016)

- fix bug in v3vspob2png which used # tiles instead of # obs

## 0.15.1 (Sep 8, 2016)

- fix various zlib buffer bugs

## 0.15.0 (Sep 7, 2016)

- VERGE3 .MAP loader and converter
- v3map2json cli

## 0.14.0 (Sep 5, 2016)

- VERGE3 .VSP loader and converter
- v3vsp2png cli
- v3vspob2png cli
- VERGE3 .CHR loader and converter
- v3chr2png cli

## 0.13.1 (Sep 5, 2016)

- Fix v2vsp2pal cli VERGE2.PAL output path

## 0.13.0 (Sep 4, 2016)

- VERGE2 .CHR loader and PNG converter
- v2vsp2pal cli
- v2chr2png cli
- VERGE2 .VSP loader and PNG converter
- v2vsp2png cli
- declarative file format loader

## 0.12.0 (Sep 3, 2016)

- VERGE1 TRANS.TBL loader and JSON converter
- transtbl2json cli
- VERGE2 .MAP loader and JSON converter
- v2map2json cli

## 0.11.0 (Sep 2, 2016)

- VERGE1 MISCICON.DAT PNG converter
- miscicondat2png cli
- VERGE1 ITEMS.DAT loader and JSON converter
- itemsdat2json cli
- VERGE1 EQUIP.DAT loader and JSON converter
- equipdat2json cli
- VERGE1 PARTY.DAT loader and JSON converter
- partydat2json cli
- VERGE1 .MAP JSON converter
- map2json cli

## 0.10.0 (Sep 1, 2016)

- VERGE1 ITEMICON.DAT loader and PNG converter
- itemicondat2png cli
- VERGE1 MISCICON.DAT loader

## 0.9.1 (Sep 1, 2016)

- Fix various broken cli due to internal changes

## 0.9.0 (Sep 1, 2016)

- pcx2png cli
- VERGE1 .CR2 loader and PNG converter
- cr22png cli

## 0.8.1 (Sep 1, 2016)

- Fix bug in PCX loader that ignored palette

## 0.8.0 (Sep 1, 2016)

- PCX loader and PNG converter

## 0.7.0 (Aug 31. 2016)

- VERGE1 SPEECH.SPC PNG converter
- speechspc2png cli

## 0.6.1 (Aug 31, 2016)

- Fix bug in VERGE1 SPEECH.SPC loader that ignored # tiles

## 0.6.0 (Aug 31, 2016)

- smallfnt2png cli
- mainfnt2png cli
- boxraw2png cli
- VERGE1 SPEECH.SPC loader

## 0.5.1 (Aug 31, 2016)

- Fix bug in tile grid converter performance

## 0.5.0 (Aug 31, 2016)

- VERGE1 SMALL.FNT loader and PNG converter
- VERGE1 MAIN.FNT loader and PNG converter
- VERGE1 BOX.RAW loader

## 0.4.0 (Aug 30, 2016)

- VERGE1 .CHR loader and PNG converter
- VERGE1 .PAL loader
- chr2png cli

## 0.3.0 (Aug 29, 2016)

- VERGE1 .VSP PNG converter
- vsp2png cli

## 0.2.0 (Aug 28, 2016)

- VERGE1 .MAP loader
- VERGE1 .VSP loader

## 0.1.0 (Aug 25, 2016)

- Electron skeleton

