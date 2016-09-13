# mappo v0.17.0

[Docs](https://github.com/chuckrector/mappo/doc/)

Currently, a collection of command-line tools which can load and convert various [VERGE](http://verge-rpg.com/) file formats. The skeleton of an Electron app is also included. After I've written loaders and converters for all known VERGE file formats, I'll start building a map editor in the Electron app.

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

- Node >= 5.10.0

# Installation

1. git clone https://github.com/chuckrector/mappo.git
2. cd mappo
3. npm install
4. npm start

# Supported File Formats

What does support mean? Currently, at least one loader. Optionally, one or more converters.

 | VERGE1 | VERGE2 | VERGE3
--- |:---:|:---:|:---:
PCX          | ✓ | ✓ | ✓
BOX.RAW      | ✓ | n/a | n/a
CHR          | ✓ | ✓ | ✓
CR2          | ✓ | n/a | n/a
EQUIP.DAT    | ✓ | n/a | n/a
ITEMICON.DAT | ✓ | n/a | n/a
ITEMS.DAT    | ✓ | n/a | n/a
MAIN.FNT     | ✓ | n/a | n/a
MAP          | ✓ | ✓ | ✓
MISCICON.DAT | ✓ | n/a | n/a
PAL          | ✓ | n/a | n/a
PARTY.DAT    | ✓ | n/a | n/a
SMALL.FNT    | ✓ | n/a | n/a
SPEECH.SPC   | ✓ | n/a | n/a
TRANS.TBL    | ✓ | ✓ | n/a
VSP          | ✓ | ✓ | ✓
VC           | ✗ | ✗ | ✗
VCS          | ✗ | ✗ | n/a
save games   | ✗ | n/a | n/a

# TODO

- kildorf | aen: if you could output a json file describing the animation data (etc.) that'd be pretty sweet
- kildorf | you could even output actual animated gifs
- json pretty printer that abbreviates long lists with ellipses
- support for conditional blocks in declarative parser (e.g. EQUIP.DAT)
- automatically run all cli as part of tests, rather than manually adding to shell script every time i make a new one. how? maybe default params in each cli and let normal js test runner drive everything
- proper npm package?
- shorthand for `filler(N, v)`, e.g. `filler(N, v)`
- `v*vsp2pnglist`? maybe overkill?
- recursive version detection & inspection of all formats
- fallbacks for loaders and converters? e.g. v2 supports v1 chrs. tricky, since formats are different and may have different requirements, e.g. v3 tiles 24- or 32-bit whereas easlier engine tiles all 8-bit, so cli to convert would need additional palette parameter in that case
- unify all cli into non-prefixed; should figure it out themselves

