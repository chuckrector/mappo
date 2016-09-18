# VERGE2k+j (a.k.a. VERGE 2.5+j) Command-Line Tools

## v2kjchr2json

Usage:

- `node src/cli/v2kjchr2json.js data/v2kj/bob.chr`

Output:

- `data/v2kj/bob.chr.json`

```json

{
  "version": 4,
  "fxsize": 16,
  "fysize": 32,
  "hx": 0,
  "hy": 16,
  "hw": 16,
  "hh": 16,
  "lidle": 10,
  "ridle": 15,
  "uidle": 5,
  "didle": 0,
  "totalframes": 20,
  "lanimLength": 48,
  "lanim": "F10W10F11W10F12W10F11W10F10W10F13W10F14W10F13W10",
  "ranimLength": 48,
  "ranim": "F15W10F16W10F17W10F16W10F15W10F18W10F19W10F18W10",
  "uanimLength": 40,
  "uanim": "F5W10F6W10F7W10F6W10F5W10F8W10F9W10F8W10",
  "danimLength": 40,
  "danim": "F0W10F1W10F2W10F2W10F0W10F3W10F4W10F3W10",
  "imagedata": {
    "bufsize": 10322,
    "compressed": [36, 255, 0, ...],
    "decompressed": [0, 0, 0, ...],
  }
}
```
