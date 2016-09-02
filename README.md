# Requirements

- Node >= 5.10.0

# Installation

1. npm install
2. npm start

# chr2png

**Support:** VERGE1 only

Usage:

- node src/cli/chr2png.js data/VERGE.PAL data/DARIN.CHR

Output:

- data/DARIN.CHR.png

![alt text](img/chr2png-example.png?raw=true "a sample of chr2png cli output")
![alt text](img/chr2png-example6.png?raw=true "a sample of chr2png cli output")
![alt text](img/chr2png-example3.png?raw=true "a sample of chr2png cli output")
![alt text](img/chr2png-example4.png?raw=true "a sample of chr2png cli output")
![alt text](img/chr2png-example5.png?raw=true "a sample of chr2png cli output")
![alt text](img/chr2png-example2.png?raw=true "a sample of chr2png cli output")
![alt text](img/chr2png-example7.png?raw=true "a sample of chr2png cli output")

# vsp2png

**Support:** VERGE1 only (16x16, N tiles, 20 columns)

Usage:

- node src/cli/vsp2png.js data/HAHN01.VSP

Output:

- data/HAHN01.VSP.png

![alt text](img/vsp2png-example.png?raw=true "a sample of vsp2png cli output")

# smallfnt2png

**Support:** VERGE1 only (7x9, 95 tiles, 19 columns)

Usage:

- node src/cli/smallfnt2png.js data/VERGE.PAL data/SMALL.FNT

Output:

- data/SMALL.FNT.png

**Note:** Gray background added here for legibility. Actual output has a transparent background.

![alt text](img/smallfnt2png-example.png?raw=true "a sample of smallfnt2png cli output")

# mainfnt2png

**Support:** VERGE1 only (9x16, 95 tiles, 19 columns)

Usage:

- node src/cli/mainfnt2png.js data/VERGE.PAL data/MAIN.FNT

Output:

- data/MAIN.FNT.png

**Note:** Gray background added here for legibility. Actual output has a transparent background.

![alt text](img/mainfnt2png-example.png?raw=true "a sample of mainfnt2png cli output")

# boxraw2png

**Support:** VERGE1 only (320x66)

Usage:

- node src/cli/boxraw2png.js data/VERGE.PAL data/BOX.RAW

Output:

- data/BOX.RAW.png

![alt text](img/boxraw2png-example.png?raw=true "a sample of boxraw2png cli output")

# speechspc2png

**Support:** VERGE1 only (32x32, N tiles, 10 columns)

Usage:

- node src/cli/speechspc2png.js data/VERGE.PAL data/SPEECH.SPC

Output:

- data/SPEECH.SPC.png

![alt text](img/speechspc2png-example.png?raw=true "a sample of speechspc2png cli output")

# cr22png

**Support:** VERGE1 only (96x96)

Usage:

- node src/cli/cr22png.js data/VERGE.PAL data/CRYSTAL.CR2

Output:

- data/CRYSTAL.CR2.png

![alt text](img/DARIN.CR2.png?raw=true "a sample of cr22png cli output")
![alt text](img/SARA.CR2.png?raw=true "a sample of cr22png cli output")
![alt text](img/DEXTER.CR2.png?raw=true "a sample of cr22png cli output")
![alt text](img/CRYSTAL.CR2.png?raw=true "a sample of cr22png cli output")
![alt text](img/GALFREY.CR2.png?raw=true "a sample of cr22png cli output")

# itemicondat2png

**Support:** VERGE1 only (16x16, N tiles, 20 columns)

Usage:

- node src/cli/itemicondat2png.js data/VERGE.PAL data/ITEMICON.DAT

Output:

- data/ITEMICON.DAT.png

![alt text](img/ITEMICON.DAT.png?raw=true "a sample of itemicondat2png cli output")

# miscicondat2png

**Support:** VERGE1 only (16x16, 24x24, 24x40)

Usage:

- node src/cli/miscicondat2png.js data/VERGE.PAL data/MISCICON.DAT

Output:

- data/MISCICON.DAT.png

![alt text](img/MISCICON.DAT.png?raw=true "a sample of miscicondat2png cli output")

# pcx2png

Usage:

- node src/cli/pcx2png.js data/STAN.PCX

Output:

- data/STAN.PCX.png

![alt text](img/pcx2png-example1.png?raw=true "a sample of pcx2png cli output")
![alt text](img/pcx2png-example2.png?raw=true "a sample of pcx2png cli output")
![alt text](img/pcx2png-example5.png?raw=true "a sample of pcx2png cli output")

# itemsdat2json

**Support:** VERGE1 only

Usage:

- node src/cli/itemsdat2json.js data/ITEMS.DAT

Output:

- data/ITEMS.DAT.json

`{"numitems":48,"items":[{"name":"Starlight","icon":0,"desc":"Restores_15_MP","useflag":1,"useeffect":1,"itemtype":1,"equipflag":0,"equipidx":0,"itmprv":0,"price":300},{"name":"Herb","icon":1,"desc":"Restores_15_HP","useflag":1,"useeffect":0,"itemtype":1,"equipflag":0,"equipidx":0,"itmprv":0,"price":30},{"name":"Speed_Boots","icon":2,"desc":"+3_REA,_+1_MBL","useflag":0,"useeffect":0,"itemtype":0,"equipflag":5,"equipidx":0,"itmprv":0,"price":300},{"name":"Dark_Sword","icon":3,"desc":"ATK_+20,_*darkness","useflag":4,"useeffect":0,"itemtype":0,"equipflag":1,"equipidx":0,"itmprv":0,"price":2000},{"name":"Iron_Sword","icon":4,"desc":"ATK+22","useflag":0,"useeffect":0,"itemtype":0,"equipflag":1,"equipidx":2,"itmprv":0,"price":440},{"name":"Leather_Vest","icon":5,"desc":"DEF+8","useflag":0,"useeffect":0,"itemtype":0,"equipflag":3,"equipidx":13,"itmprv":0,"price":160},{"name":"Cap","icon":6,"desc":"DEF+4","useflag":0,"useeffect":0,"itemtype":0,"equipflag":4,"equipidx":18,"itmprv":0,"price":80},{"name":"Buckler","icon":7,"desc":"DEF+6","useflag":0,"useeffect":0,"itemtype":0,"equipflag":2,"equipidx":24,"itmprv":0,"price":120},{"name":"Staff","icon":8,"desc":"ATK+9,_MAG+2","useflag":0,"useeffect":0,"itemtype":0,"equipflag":1,"equipidx":4,"itmprv":0,"price":200},{"name":"Pooh","icon":0,"desc":"Pooh!","useflag":0,"useeffect":0,"itemtype":0,"equipflag":0,"equipidx":0,"itmprv":0,"price":0},{"name":"Cloak","icon":9,"desc":"DEF+4,_MGR+4","useflag":0,"useeffect":0,"itemtype":0,"equipflag":3,"equipidx":11,"itmprv":0,"price":120},{"name":"Hood","icon":10,"desc":"DEF+2,_MAG+2","useflag":0,"useeffect":0,"itemtype":0,"equipflag":4,"equipidx":17,"itmprv":0,"price":50},{"name":"Bracer","icon":11,"desc":"DEF+4","useflag":0,"useeffect":0,"itemtype":0,"equipflag":2,"equipidx":22,"itmprv":0,"price":80},{"name":"Sting_Whip","icon":12,"desc":"ATK+18,_HIT+5","useflag":0,"useeffect":0,"itemtype":0,"equipflag":1,"equipidx":5,"itmprv":0,"price":400},{"name":"Robe","icon":13,"desc":"DEF+7,_MGR+2","useflag":0,"useeffect":0,"itemtype":0,"equipflag":3,"equipidx":12,"itmprv":0,"price":140},{"name":"Tiara","icon":14,"desc":"DEF+6,_MAG+2","useflag":0,"useeffect":0,"itemtype":0,"equipflag":4,"equipidx":19,"itmprv":0,"price":180},{"name":"Silver_Brace","icon":15,"desc":"DEF+5,_MGR+2","useflag":0,"useeffect":0,"itemtype":0,"equipflag":2,"equipidx":23,"itmprv":0,"price":150},{"name":"Lead_Wrench","icon":16,"desc":"ATK+21","useflag":0,"useeffect":0,"itemtype":0,"equipflag":1,"equipidx":7,"itmprv":0,"price":425},{"name":"Titanium_Suit","icon":17,"desc":"DEF+11","useflag":0,"useeffect":0,"itemtype":0,"equipflag":3,"equipidx":14,"itmprv":0,"price":220},{"name":"Head_Brace","icon":18,"desc":"DEF+7","useflag":0,"useeffect":0,"itemtype":0,"equipflag":4,"equipidx":20,"itmprv":0,"price":140},{"name":"Laser_Shield","icon":19,"desc":"DEF+10,_ATK+3","useflag":0,"useeffect":0,"itemtype":0,"equipflag":2,"equipidx":25,"itmprv":0,"price":300},{"name":"Thermal_Activator","icon":20,"desc":"Starts_crystal_machine","useflag":0,"useeffect":0,"itemtype":0,"equipflag":0,"equipidx":0,"itmprv":0,"price":0},{"name":"Bronze_Key","icon":21,"desc":"Key_to_the_love_shack","useflag":0,"useeffect":0,"itemtype":0,"equipflag":0,"equipidx":0,"itmprv":0,"price":0},{"name":"Pearl_of_Truth","icon":22,"desc":"Opens_castle_gate","useflag":0,"useeffect":0,"itemtype":0,"equipflag":0,"equipidx":0,"itmprv":0,"price":0},{"name":"Steel_Lance","icon":23,"desc":"ATK+28","useflag":0,"useeffect":0,"itemtype":0,"equipflag":1,"equipidx":9,"itmprv":0,"price":560},{"name":"Bronze_Armor","icon":24,"desc":"DEF+16","useflag":0,"useeffect":0,"itemtype":0,"equipflag":3,"equipidx":15,"itmprv":0,"price":320},{"name":"Gold_Helmet","icon":25,"desc":"DEF+8","useflag":0,"useeffect":0,"itemtype":0,"equipflag":4,"equipidx":21,"itmprv":0,"price":160},{"name":"Tower_Shield","icon":26,"desc":"DEF+13","useflag":0,"useeffect":0,"itemtype":0,"equipflag":2,"equipidx":26,"itmprv":0,"price":260},{"name":"West_Tower_Key","icon":21,"desc":"Key_to_West_Tower","useflag":0,"useeffect":0,"itemtype":1,"equipflag":0,"equipidx":0,"itmprv":0,"price":0},{"name":"East_Tower_Key","icon":21,"desc":"Key_to_East_Tower","useflag":0,"useeffect":0,"itemtype":1,"equipflag":0,"equipidx":0,"itmprv":0,"price":0},{"name":"Spire_Key","icon":21,"desc":"Key_to_Central_Spire","useflag":0,"useeffect":0,"itemtype":1,"equipflag":0,"equipidx":0,"itmprv":0,"price":0},{"name":"Dagger","icon":27,"desc":"ATK+5","useflag":0,"useeffect":0,"itemtype":0,"equipflag":1,"equipidx":1,"itmprv":0,"price":100},{"name":"Wand","icon":28,"desc":"ATK+3,_MAG+5","useflag":0,"useeffect":0,"itemtype":0,"equipflag":1,"equipidx":3,"itmprv":0,"price":90},{"name":"Brass_Pipe","icon":29,"desc":"ATK+10","useflag":0,"useeffect":0,"itemtype":0,"equipflag":1,"equipidx":6,"itmprv":0,"price":200},{"name":"Spear","icon":30,"desc":"ATK+15","useflag":0,"useeffect":0,"itemtype":0,"equipflag":1,"equipidx":8,"itmprv":0,"price":300},{"name":"Headband","icon":31,"desc":"DEF+1","useflag":0,"useeffect":0,"itemtype":0,"equipflag":4,"equipidx":16,"itmprv":0,"price":20},{"name":"Garment","icon":32,"desc":"DEF+2","useflag":0,"useeffect":0,"itemtype":0,"equipflag":3,"equipidx":10,"itmprv":0,"price":40},{"name":"Medicine","icon":33,"desc":"Restores_45_HP","useflag":1,"useeffect":2,"itemtype":1,"equipflag":0,"equipidx":0,"itmprv":0,"price":100},{"name":"Miracle_Brew","icon":34,"desc":"Heals_defeated_ally","useflag":1,"useeffect":3,"itemtype":1,"equipflag":0,"equipidx":0,"itmprv":0,"price":250},{"name":"Blur_Ring","icon":35,"desc":"Improves_evasion_rate","useflag":0,"useeffect":0,"itemtype":0,"equipflag":5,"equipidx":27,"itmprv":0,"price":450},{"name":"Fury_Ring","icon":36,"desc":"Increases_Ferocity","useflag":0,"useeffect":0,"itemtype":0,"equipflag":5,"equipidx":28,"itmprv":0,"price":600},{"name":"Running_Boots","icon":37,"desc":"Extends_Mobility","useflag":0,"useeffect":0,"itemtype":0,"equipflag":6,"equipidx":29,"itmprv":0,"price":750},{"name":"Protect_Locket","icon":38,"desc":"Fortifies_magic_defense","useflag":0,"useeffect":0,"itemtype":0,"equipflag":6,"equipidx":30,"itmprv":0,"price":1000},{"name":"Carrot_Blade","icon":39,"desc":"ATK+30","useflag":0,"useeffect":0,"itemtype":0,"equipflag":1,"equipidx":31,"itmprv":0,"price":5000},{"name":"Sacred_Carrot","icon":40,"desc":"Item_of_Absolute_Power","useflag":0,"useeffect":0,"itemtype":0,"equipflag":0,"equipidx":0,"itmprv":0,"price":0},{"name":"Pharaoh_Sceptre","icon":41,"desc":"ATK+15,_MAG+10","useflag":0,"useeffect":0,"itemtype":0,"equipflag":1,"equipidx":32,"itmprv":244,"price":0},{"name":"Atlas_Scroll","icon":42,"desc":"Shows_position_on_map","useflag":2,"useeffect":4,"itemtype":0,"equipflag":0,"equipidx":0,"itmprv":0,"price":0},{"name":"Item_Name","icon":0,"desc":"Item_Description","useflag":0,"useeffect":0,"itemtype":0,"equipflag":0,"equipidx":0,"itmprv":0,"price":null}]}`

# TODO

- kildorf | aen: if you could output a json file describing the animation data (etc.) that'd be pretty sweet
- more VERGE1-related formats
  - ITEMS.DAT
  - EQUIP.DAT
  - PARTY.DAT
  - TRANS.TBL
  - compiled scripts: EFFECTS.VCS, STARTUP.VCS, etc.
  - save games
- VERGE2 formats
- VERGE3 formats