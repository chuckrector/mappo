# TODO

- option for `v3chr2gif` to generate reduced palette rather than requiring one
- export json/gif/png to the binary formats
- all cli accepting palettes as inputs should accept JSON palettes too
- handle file read errors, e.g. file doesn't exist (`readFileSync`, etc.)
- time for react/redux? ui updates getting complex. undo/redo may be easiest with redux
- remove T.zlib & B.zlib
- cool
```
   SDHawk | I sure do wish people would spend more time making sweet game data editors instead of just map editors but what can you do
  kildorf | "game data editors"?
  kildorf | maps are the most complicated data most games have
  kildorf | I think it's natural
@Thrasher | i imagine he means stuff like, if you're editing enemy statistics, it shows you calculations and shit. that's the most basic example i can think of
@Thrasher | basically, relating numbers to what they actually mean for the game
   SDHawk | maps are more like the first data you need to hit to make a visually presentable game
```

```
@Thrasher | or a better example is that battle editor i did for shining force 2: http://www.romhacking.net/utilities/screenshots/452screenshot1.png
```

![alt text](/img/inspiration/thrasher-battle-editor-for-shining-force-2.png?raw=true "a screenshot of Thrasher's battle editor for Shining Force 2")

```
@Thrasher | so there's a java tool someone made for rpgmaker called demiurge                                                                                                                                                               │ Xena
@Thrasher | it does the semantic definitions thing for the notes field i talked about                                                                                                                                                      │ ZedPlus
@Thrasher | you can say "there's this type of data, it takes these parameters" and creates ui fields dynamically to let you select values                                                                                                  │ zk
@Thrasher | for my game i have weapon proficiency levels, which is a script and isn't supported by the base engine                                                                                                                         │
```

[Demiurge](http://forums.rpgmakerweb.com/index.php?/topic/40752-demiurge-a-notes-manager-and-extensible-database-updated-to-v11/)

![alt text](/img/inspiration/demiurge-v1.1.png?raw=true "a screenshot of Enelvon's Demiurge for RPGMaker")

# TASKS

- thumbnails of each recursively loaded map would be awesome
- a small summary of info next to each map would also be great
- some messaging that drag & drop can load a map too
- drag & drop to load maps
