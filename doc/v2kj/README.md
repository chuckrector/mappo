# VERGE2k+j (a.k.a. VERGE 2.5+j) Command-Line Tools

## v2kjchr2gif

**Support:** VERGE2k+j only (WxH, N tiles)

Usage:

- `node src/cli/v2kjchr2gif.js data/v1/VERGE.PAL data/v2kj/bob.chr`

Output:

- `data/v2kj/bob.chr-down.gif`
- `data/v2kj/bob.chr-up.gif`
- `data/v2kj/bob.chr-right.gif`
- `data/v2kj/bob.chr-left.gif`

![alt text](/img/v2kj/bob.chr-down.gif?raw=true "a sample of v2kjchr2gif cli output")
![alt text](/img/v2kj/bob.chr-up.gif?raw=true "a sample of v2kjchr2gif cli output")
![alt text](/img/v2kj/bob.chr-right.gif?raw=true "a sample of v2kjchr2gif cli output")
![alt text](/img/v2kj/bob.chr-left.gif?raw=true "a sample of v2kjchr2gif cli output")

## v2kjchr2json

Usage:

- `node src/cli/v2kjchr2json.js data/v2kj/bob.chr`

Output:

- `data/v2kj/bob.chr.json`

```json

{
  "version": 4,
  "frameWidth": 16,
  "frameHeight": 32,
  "hotSpotX": 0,
  "hotSpotY": 16,
  "hotSpotWidth": 16,
  "hotSpotHeight": 16,
  "lidle": 10,
  "ridle": 15,
  "uidle": 5,
  "didle": 0,
  "frameCount": 20,
  "lanimLength": 48,
  "lanim": "F10W10F11W10F12W10F11W10F10W10F13W10F14W10F13W10",
  "ranimLength": 48,
  "ranim": "F15W10F16W10F17W10F16W10F15W10F18W10F19W10F18W10",
  "uanimLength": 40,
  "uanim": "F5W10F6W10F7W10F6W10F5W10F8W10F9W10F8W10",
  "danimLength": 40,
  "danim": "F0W10F1W10F2W10F2W10F0W10F3W10F4W10F3W10",
  "frames": {
    "bufsize": 10322,
    "compressed": [36, 255, 0, ...],
    "decompressed": [0, 0, 0, ...],
  }
}
```
## v2kjchr2png

**Support:** VERGE2k+j only (WxH, N tiles, 5 columns)

Usage:

- `node src/cli/v2kjchr2png.js data/v2kj/bob.chr`

Output:

- `data/v2kj/bob.chr.png`

![alt text](/img/v2kj/bob.chr.png?raw=true "a sample of v2kjchr2png cli output")

## v2kjchr2pnglist

**Support:** VERGE2k+j only (WxH, N tiles, 5 columns)

Usage:

- `node src/cli/v2kjchr2pnglist.js data/v2kj/bob.chr`

Output:

- `data/v2kj/bob.chr-0.png` .. `data/v2kj/bob.chr-` (N - 1) `.png`

![alt text](/img/v2kj/bob.chr-0.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-1.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-2.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-3.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-4.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-5.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-6.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-7.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-8.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-9.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-10.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-11.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-12.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-13.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-14.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-15.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-16.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-17.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-18.png?raw=true "a sample of v2kjchr2pnglist cli output")
![alt text](/img/v2kj/bob.chr-19.png?raw=true "a sample of v2kjchr2pnglist cli output")
