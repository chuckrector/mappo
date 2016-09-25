# ![alt text](/img/v1/CRYSTAL.CHR-down.gif?raw=true "a sample of v2chr2gif cli output") mappo v0.24.0 ![alt text](/img/v1/DARIN.CHR-down.gif?raw=true "a sample of v2chr2gif cli output")

[Docs](https://github.com/chuckrector/mappo/tree/master/doc)

![alt text](/img/mappo-wip-layer-visibility.png?raw=true "mappo work-in-progress screenshot of recently implemented layer visibility toggling")

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

# Supported File Formats

What does support mean? Currently, at least one loader. Optionally, one or more converters.

 | VERGE1 | VERGE2 | VERGE2k+j | VERGE3
--- |:---:|:---:|:---:|:---:
PCX          | ✓ | ✓ | ✓ | ✓
BOX.RAW      | ✓ | n/a | n/a | n/a
CHR          | ✓ | ✓ | ✓ | ✓
CR2          | ✓ | n/a | n/a | n/a
EQUIP.DAT    | ✓ | n/a | n/a | n/a
ITEMICON.DAT | ✓ | n/a | n/a | n/a
ITEMS.DAT    | ✓ | n/a | n/a | n/a
MAIN.FNT     | ✓ | n/a | n/a | n/a
MAP          | ✓ | ✓ | ✓ | ✓
MISCICON.DAT | ✓ | n/a | n/a | n/a
PAL          | ✓ | n/a | n/a | n/a
PARTY.DAT    | ✓ | n/a | n/a | n/a
SMALL.FNT    | ✓ | n/a | n/a | n/a
SPEECH.SPC   | ✓ | n/a | n/a | n/a
TRANS.TBL    | ✓ | ✓ | ✓ | n/a
VSP          | ✓ | ✓ | ✗ | ✓
VC           | ✗ | ✗ | ✗ | ✗
VCS          | ✗ | ✗ | ✗ | n/a
save games   | ✗ | n/a | n/a | n/a
