"use strict"

const process = require(`process`)

const fs = require(`fs`)
const createVerge3ChrConverter = require(`../converter/createVerge3ChrConverter`)// TODO looks unneccesary?
const asset = require(`../asset`)

const chrFilename = process.argv[2]
const chrData = asset.fromDisk(chrFilename, asset.v3chr)
const targetFilename = chrFilename + `.json`

console.log("DUMPING...")

delete chrData.frames

const replaceAll = (myString, search, replacement) => {
  return myString.replace(new RegExp(search, 'g'), replacement);
};

const deepCopy = (val) => {
  return JSON.parse(JSON.stringify(val));
};

const isNumber = (str) => {
  return !isNaN(parseInt(str, 10));
};


const animStringData = (animString) => {
  var str = replaceAll(animString, ' ', '');
  var ret = [];
  var tmp = [];
  var code = '';
  var num = '';
  var chr = '';

  for (var i = 0; i<str.length; i++ ) {
    chr = str[i];

    if( isNumber(chr) ) {
      if( !code ) {
        console.warn('recieved a number without a code loaded in, was: ', chr);
        continue;
      } else {
        num = num + chr;
      }
    } else {
      if( num || i !== 0 ) { // time to save out
        ret.push({
          code: code,
          value: parseInt(num)
        });
      }

      code = chr;
      num = '';
    }
  }

  if(num) {
    ret.push({
      code: code,
      value: parseInt(num)
    });
  }

  return ret;
};

const animConvert = (animString) => {
  var ret = [];
  ret[1] = "Looping";

  var parsed = animStringData(animString); // holder
  var anim = [];

  for (var i = 0; i<parsed.length; i+=2 ) {

    if( parsed[i].code === 'F' && parsed[i+1].code === 'W' ) {
      anim.push([parsed[i].value, parsed[i+1].value]);
    } else {
      console.error( "DETECTED UNHANDLED ANIMSTRING PAIR: ",parsed[i].code, parsed[i+1].code );
      throw "blowup";
    }
  }

  ret[0] = anim;

  return ret;
};


chrData._V3_LEGACY = {};

chrData._V3_LEGACY.signature = deepCopy(chrData.signature);
chrData._V3_LEGACY.version = deepCopy(chrData.version);
chrData._V3_LEGACY.bitsPerPixel = deepCopy(chrData.bitsPerPixel);
chrData._V3_LEGACY.flags = deepCopy(chrData.flags);
chrData._V3_LEGACY.transparentColor = deepCopy(chrData.transparentColor);
chrData._V3_LEGACY.formatName = deepCopy(chrData.formatName);
chrData._V3_LEGACY.customScriptsIgnored = deepCopy(chrData.customScriptsIgnored);
chrData._V3_LEGACY.compression = deepCopy(chrData.compression);

delete chrData.signature
delete chrData.version
delete chrData.bitsPerPixel
delete chrData.flags
delete chrData.transparentColor
delete chrData.formatName
delete chrData.customScriptsIgnored
delete chrData.compression

var newAnim = {};

chrData.dims = [chrData.frameWidth, chrData.frameHeight];
delete chrData.frameWidth
delete chrData.frameHeight

chrData.hitbox = [chrData.hotSpotX, chrData.hotSpotY, chrData.hotSpotWidth, chrData.hotSpotHeight];
delete chrData.hotSpotX
delete chrData.hotSpotY
delete chrData.hotSpotWidth
delete chrData.hotSpotHeight

chrData.frames = chrData.frameCount
delete chrData.frameCount

var newAnim = {};

// rudimentary tests
// newAnim["no space"] = animConvert("F69W100F42W400");
// newAnim["yes space"] = animConvert("F0 W100 F2 W50 F1 W200");

newAnim["Idle Down"] =  [ [ [chrData.downIdleFrameIndex, 10000] ], "Looping" ]; // TODO needs "STATIC" in format
newAnim["Idle Up"] =  [ [ [chrData.upIdleFrameIndex, 10000] ], "Looping" ]; // TODO needs "STATIC" in format
newAnim["Idle Left"] =  [ [ [chrData.leftIdleFrameIndex, 10000] ], "Looping" ]; // TODO needs "STATIC" in format
newAnim["Idle Right"] =  [ [ [chrData.rightIdleFrameIndex, 10000] ], "Looping" ]; // TODO needs "STATIC" in format

newAnim["Walk Down"] = animConvert(chrData.animations[0].animationString)
newAnim["Walk Up"] = animConvert(chrData.animations[1].animationString)
newAnim["Walk Right"] = animConvert(chrData.animations[2].animationString)
newAnim["Walk Left"] = animConvert(chrData.animations[3].animationString)

// TODO ignoring UL/DL/UR/DR (chrData.animations indexes [4,7])

chrData.animations = newAnim;

delete chrData.downIdleFrameIndex
delete chrData.upIdleFrameIndex
delete chrData.leftIdleFrameIndex
delete chrData.rightIdleFrameIndex

chrData.image = replaceAll( chrFilename + '.png', `XNAVERGE/Examples/Sully/SullyContent/`, '');

chrData.inner_pad = 0;
chrData.outer_pad = 0;
chrData.per_row = 5;

console.log(JSON.stringify(chrData, null, 2))

fs.writeFileSync(targetFilename, JSON.stringify(chrData))

console.log(`converted`, chrFilename, `to`, targetFilename)
