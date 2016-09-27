# ![alt text](/img/v1/CRYSTAL.CHR-down.gif?raw=true "a sample of v2chr2gif cli output") mappo v0.26.0 ![alt text](/img/v1/DARIN.CHR-down.gif?raw=true "a sample of v2chr2gif cli output")

![alt text](/img/wip/mappo-wip-tileset-selected-and-hovering-tiles.png?raw=true "mappo work-in-progress screenshot of recently implemented display of which tile is currently selected and being hovered over in the tileset")

Mappo is a *work in progress* 2D tile map editor for retro games. Currently, only [VERGE](http://verge-rpg.com/) file formats are supported. A comprehensive set of command-line tools for loading and exporting all VERGE file formats (to PNG/GIF/JSON) are included.

# Why?

Grue showed me his cool [maped4](https://github.com/mcgrue/maped4) project. It exploded when I tried to use it, so I created this project to isolate the issues and understand why. Node and Electron and VERGE are cool, so I kept going. It's a fun way to probe unfamiliar territory (Node and Electron) with a familiar face (VERGE).

In ancient times, I worked on my own map editor. http://chuckrector.com/old/ So, I have a soft spot. Partly, this project is about "Can I do what I once did more easily?" Partly, it's also about "How much more powerful am I now?"

```
Triplefox | what is the plan for the loaders? just to have everything in json?
     @aen | binary formats can be viewed as a bit of a barrier
     @aen | conversion to json/png/whatever simply lowers that barrier
     @aen | and allows us all to stripmine everything
```

# Requirements

- Node >= 5.10.0 (`Buffer.from`)

# Installation

1. git clone https://github.com/chuckrector/mappo.git
2. cd mappo
3. npm install
4. npm start

# Planned Features

[CHANGELOG](https://github.com/chuckrector/mappo/blob/master/CHANGELOG.md)

Emoji | What does it mean?
:---:| ---
✅ | I did it!
😭 | I didn't do it yet.
🛠 | I'm working on it!
💥 | I've done some parts of it.

Feature | Implemented?
--- |:---:
Show all maps in launch folder (even subfolders) | ✅
Click any V1/V2/V3 map to load it | ✅
Save maps | 😭
Auto-save | 😭
Tile selector | ✅
Plot tiles | 💥🛠💥
Undo/redo | 💥🛠💥
Fill region with tiles | 😭
Auto-tiling | 😭
Draw map layers in correct order | ✅
Draw tile animations | 😭
Edit tile animations | 😭
Draw characters/entities | 😭
Edit characters/entities | 😭
Edit map layer order | 😭
Draw obstructions | 😭
Edit obstructions | 😭
Draw zones | 😭
Edit zones | 😭
Show all map layers | ✅
Toggle layer visibility | ✅
Scroll viewport w/ keys | ✅
Scroll viewport w/ mouse near edges | ✅
Scroll viewport w/ mouse dragging | ✅
Zoom map (ctrl +/-) | ✅
Multi-tile brushes | 😭
Multi-tile templates w/ zones & obstructions | 😭
On launch, load previous map | 😭
On launch, remember previous window size & position | 😭
On launch, remember previous session undo history | 😭
Drag & drop maps to load them | 😭
Drag & drop tilesets to load them | 😭
Drag & drop images to load them as tilesets or characters | 😭

# Command-Line Tools

[Command-Line Documentation](https://github.com/chuckrector/mappo/tree/master/doc)

What does support mean? Currently, at least one loader. Optionally, one or more converters.

Tool | Description
--- | ---
[map2tmx](https://github.com/chuckrector/mappo/tree/master/doc#user-content-map2tmx) | Convert any VERGE map to [Tiled](http://www.mapeditor.org/) .TMX
[pcx2png](https://github.com/chuckrector/mappo/tree/master/doc#user-content-pcx2png) | Convert any PCX image to 32-bit PNG
[v1boxraw2png](https://github.com/chuckrector/mappo/tree/master/doc/v1#user-content-v1boxraw2png) | Convert VERGE1 `BOX.RAW` to 32-bit PNG
[v1chr2gif](https://github.com/chuckrector/mappo/tree/master/doc/v1#user-content-v1chr2gif) | Convert VERGE1 `.CHR` to animated GIF
[v1chr2json](https://github.com/chuckrector/mappo/tree/master/doc/v1#user-content-v1chr2json) | Convert VERGE1 `.CHR` to JSON
[v1chr2png](https://github.com/chuckrector/mappo/tree/master/doc/v1#user-content-v1chr2png) | Convert VERGE1 `.CHR` frames to a single 32-bit PNG sprite sheet
[v1chr2pnglist](https://github.com/chuckrector/mappo/tree/master/doc/v1#user-content-v1chr2pnglist) | Convert VERGE1 `.CHR` frames to individual 32-bit PNG images
[v1cr22png](https://github.com/chuckrector/mappo/tree/master/doc/v1#user-content-v1cr22png) | Convert VERGE1 `.CR2` to 32-bit PNG
[v1equipdat2json](https://github.com/chuckrector/mappo/tree/master/doc/v1#user-content-v1equipdat2json) | Convert VERGE1 `EQUIP.DAT` to JSON
[v1itemicondat2png](https://github.com/chuckrector/mappo/tree/master/doc/v1#user-content-v1itemicondat2png) | Convert VERGE1 `ITEMICON.DAT` to a single 32-bit PNG sprite sheet
[v1itemsdat2json](https://github.com/chuckrector/mappo/tree/master/doc/v1#user-content-v1itemsdat2json) | Convert VERGE1 `ITEMS.DAT` to JSON
[v1mainfnt2png](https://github.com/chuckrector/mappo/tree/master/doc/v1#user-content-v1mainfnt2png) | Convert VERGE1 `MAIN.FNT` font to a single 32-bit PNG sprite sheet
[v1map2json](https://github.com/chuckrector/mappo/tree/master/doc/v1#user-content-v1map2json) | Convert VERGE1 map to JSON
[v1miscicondat2png](https://github.com/chuckrector/mappo/tree/master/doc/v1#user-content-v1miscicondat2png) | Convert VERGE1 `MISCICON.DAT` to a single 32-bit PNG sprite sheet
[v1partydat2json](https://github.com/chuckrector/mappo/tree/master/doc/v1#user-content-v1partydat2json) | Convert VERGE1 `PARTY.DAT` to JSON
[v1smallfnt2png](https://github.com/chuckrector/mappo/tree/master/doc/v1#user-content-v1smallfnt2png) | Convert VERGE1 `SMALL.FNT` font to a single 32-bit PNG sprite sheet
[v1speechspc2png](https://github.com/chuckrector/mappo/tree/master/doc/v1#user-content-v1speechspc2png) | Convert VERGE1 `SPEECH.SPC` cels to a single 32-bit PNG sprite sheet
[v1transtbl2json](https://github.com/chuckrector/mappo/tree/master/doc/v1#user-content-v1transtbl2json) | Convert VERGE1 `TRANS.TBL` to JSON
[v1vsp2png](https://github.com/chuckrector/mappo/tree/master/doc/v1#user-content-v1vsp2png) | Convert VERGE1 tileset to a single 32-bit PNG sprite sheet

# Supported File Formats

 | VERGE1 | VERGE2 | VERGE2k+j | VERGE3
--- |:---:|:---:|:---:|:---:
PCX          | ✅ | ✅ | ✅ | ✅
BOX.RAW      | ✅ | n/a | n/a | n/a
CHR          | ✅ | ✅ | ✅ | ✅
CR2          | ✅ | n/a | n/a | n/a
EQUIP.DAT    | ✅ | n/a | n/a | n/a
ITEMICON.DAT | ✅ | n/a | n/a | n/a
ITEMS.DAT    | ✅ | n/a | n/a | n/a
MAIN.FNT     | ✅ | n/a | n/a | n/a
MAP          | ✅ | ✅ | ✅ | ✅
MISCICON.DAT | ✅ | n/a | n/a | n/a
PAL          | ✅ | n/a | n/a | n/a
PARTY.DAT    | ✅ | n/a | n/a | n/a
SMALL.FNT    | ✅ | n/a | n/a | n/a
SPEECH.SPC   | ✅ | n/a | n/a | n/a
TRANS.TBL    | ✅ | ✅ | ✅ | n/a
VSP          | ✅ | ✅ | 😭 | ✅
VC           | 😭 | 😭 | 😭 | 😭
VCS          | 😭 | 😭 | 😭 | n/a
save games   | 😭 | n/a | n/a | n/a
