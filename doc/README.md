# Engines

[VERGE1](https://github.com/chuckrector/mappo/tree/master/doc/v1) | [VERGE2](https://github.com/chuckrector/mappo/tree/master/doc/v2) | [VERGE2k+j](https://github.com/chuckrector/mappo/tree/master/doc/v2kj) | [VERGE3](https://github.com/chuckrector/mappo/tree/master/doc/v3)

# General Command-Line Tools

## pcx2png

Converts a PCX image into a PNG image.

Usage:

- `node src/cli/pcx2png.js data/STAN.PCX`

Output:

- `data/STAN.PCX.png`

![alt text](/img/STAN.PCX.png?raw=true "a sample of pcx2png cli output")
![alt text](/img/VERGE1.PCX.png?raw=true "a sample of pcx2png cli output")
![alt text](/img/VERGE320.PCX.png?raw=true "a sample of pcx2png cli output")

## map2tmx

Converts any VERGE map into a Tiled TMX file.

**Note:**

- It is assumed that you have already generated a PNG file for the map's tileset (e.g. with `v3vsp2png` or similar).
- You will need to copy that PNG file alongside the TMX file in order to successfully open it from Tiled.
- Parallax information is lost. Not sure how that works yet.

Usage:

- `node src/cli/map2tmx.js data/v3/bumville2.map`

Output:

- `data/v3/bumville2.map.tmx`

![alt text](/img/v3/bumville2.map.tmx.png?raw=true "a sample of map2tmx cli output loaded into Tiled")

**Note:** Output here is abbreviated for readability.

```xml
<?xml version='1.0'?>
<map version='1.0' orientation='orthogonal' width='150' height='250' tilewidth='16' tileheight='16'>
    <tileset firstgid='1' name='grue0030.vsp' tilewidth='16' tileheight='16' spacing='0' margin='0' tilecount='1120' columns='20'>
        <image source='grue0030.vsp.png' width='320' height='896'/>
    </tileset>
    <layer name='Background' width='150' height='250'>
        <data encoding='csv'>1,1,1,...</data>
    </layer>
    <layer name='Back Parallax' width='150' height='250'>
        <data encoding='csv'>163,163,163,...</data>
    </layer>
    <layer name='Background Extra' width='150' height='250'>
        <data encoding='csv'>1,1,1,...</data>
    </layer>
    <layer name='Foreground' width='150' height='250'>
        <data encoding='csv'>1,1,1,...</data>
    </layer>
    <layer name='Foreground Extra' width='150' height='250'>
        <data encoding='csv'>1,1,1,...</data>
    </layer>
    <layer name='Switch Layer' width='150' height='250'>
        <data encoding='csv'>1,1,1,...</data>
    </layer>
    <layer name='Background Extra 2' width='150' height='250'>
        <data encoding='csv'>1,1,1,...</data>
    </layer>
    <layer name='Water' width='150' height='250'>
        <data encoding='csv'>1,1,1,...</data>
    </layer>
</map>```
