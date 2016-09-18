# TODO

- automatically run all cli as part of tests, rather than manually adding to shell script every time i make a new one. how? maybe default params in each cli and let normal js test runner drive everything
- proper npm package?
- `v*vsp2pnglist`? maybe overkill?
- recursive version detection & inspection of all formats
- fallbacks for loaders and converters? e.g. v2 supports v1 chrs. tricky, since formats are different and may have different requirements, e.g. v3 tiles 24- or 32-bit whereas easlier engine tiles all 8-bit, so cli to convert would need additional palette parameter in that case
- unify all cli into non-prefixed; should figure it out themselves
- option for `v3chr2gif` to generate reduced palette rather than requiring one
- export json/gif/png to the binary formats
- all cli accepting palettes as inputs should accept JSON palettes too
