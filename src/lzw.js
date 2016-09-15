/*
  LZWEncoder.js

  Authors
  Kevin Weiner (original Java version - kweiner@fmsware.com)
  Thibault Imbert (AS3 version - bytearray.org)
  Johan Nordberg (JS version - code@johan-nordberg.com)

  Acknowledgements
  GIFCOMPR.C - GIF Image compression routines
  Lempel-Ziv compression based on 'compress'. GIF modifications by
  David Rowley (mgardi@watdcsu.waterloo.edu)
  GIF Image compression - modified 'compress'
  Based on: compress.c - File compression ala IEEE Computer, June 1984.
  By Authors: Spencer W. Thomas (decvax!harpo!utah-cs!utah-gr!thomas)
  Jim McKie (decvax!mcvax!jim)
  Steve Davies (decvax!vax135!petsd!peora!srd)
  Ken Turkowski (decvax!decwrl!turtlevax!ken)
  James A. Woods (decvax!ihnp4!ames!jaw)
  Joe Orost (decvax!vax135!petsd!joe)
*/

const EOF = -1
const BITS = 12
const HSIZE = 5003 // 80% occupancy
const masks = [
  0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F,
  0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF,
  0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF,
]

module.exports = ({data, writeByte, writeByteArray}) => {
  const initCodeSize = 8

  const accum = new Uint8Array(256)
  const htab = new Int32Array(HSIZE)
  const codetab = new Int32Array(HSIZE)

  let cur_accum, cur_bits = 0
  let a_count
  let free_ent = 0 // first unused entry
  let maxcode

  // block compression parameters -- after all codes are used up,
  // and compression rate changes, start over.
  let clear_flg = false

  // Algorithm: use open addressing double hashing (no chaining) on the
  // prefix code / next character combination. We do a variant of Knuth's
  // algorithm D (vol. 3, sec. 6.4) along with G. Knott's relatively-prime
  // secondary probe. Here, the modular division first probe is gives way
  // to a faster exclusive-or manipulation. Also do block compression with
  // an adaptive reset, whereby the code table is cleared when the compression
  // ratio decreases, but after the table fills. The variable-length output
  // codes are re-sized at this point, and a special CLEAR code is generated
  // for the decompressor. Late addition: construct the table according to
  // file size for noticeable speed improvement on small files. Please direct
  // questions about this implementation to ames!jaw.
  let g_init_bits, ClearCode, EOFCode

  // Add a character to the end of the current packet, and if it is 254
  // characters, flush the packet to disk.
  const char_out = (c) => {
    accum[a_count++] = c
    if (a_count >= 254) flush_char()
  }

  // Clear out the hash table
  // table clear for block compress
  const cl_block = () => {
    cl_hash(HSIZE)
    free_ent = ClearCode + 2
    clear_flg = true
    output(ClearCode)
  }

  // Reset code table
  const cl_hash = (hsize) => {
    for (let i = 0; i < hsize; ++i) htab[i] = -1
  }

  const compress = (init_bits) => {
    let fcode, c, i, ent, disp, hsize_reg, hshift

    // Set up the globals: g_init_bits - initial number of bits
    g_init_bits = init_bits

    // Set up the necessary values
    clear_flg = false
    n_bits = g_init_bits
    maxcode = MAXCODE(n_bits)

    ClearCode = 1 << (init_bits - 1)
    EOFCode = ClearCode + 1
    free_ent = ClearCode + 2

    a_count = 0 // clear packet

    ent = nextPixel()

    hshift = 0
    for (fcode = HSIZE; fcode < 65536; fcode *= 2) ++hshift
    hshift = 8 - hshift // set hash code range bound
    hsize_reg = HSIZE
    cl_hash(hsize_reg) // clear hash table

    output(ClearCode)

    outer_loop: while ((c = nextPixel()) != EOF) {
      fcode = (c << BITS) + ent
      i = (c << hshift) ^ ent // xor hashing
      if (htab[i] === fcode) {
        ent = codetab[i]
        continue
      } else if (htab[i] >= 0) { // non-empty slot
        disp = hsize_reg - i // secondary hash (after G. Knott)
        if (i === 0) disp = 1
        do {
          if ((i -= disp) < 0) i += hsize_reg
          if (htab[i] === fcode) {
            ent = codetab[i]
            continue outer_loop
          }
        } while (htab[i] >= 0)
      }
      output(ent)
      ent = c
      if (free_ent < 1 << BITS) {
        codetab[i] = free_ent++ // code -> hashtable
        htab[i] = fcode
      } else {
        cl_block()
      }
    }

    // Put out the final code.
    output(ent)
    output(EOFCode)
  }

  // Flush the packet to disk, and reset the accumulator
  const flush_char = () => {
    if (a_count > 0) {
      writeByte(a_count)
      writeByteArray(accum.slice(0, a_count))//, a_count)
      a_count = 0
    }
  }

  const MAXCODE = (n_bits) => (1 << n_bits) - 1

  // Return the next pixel from the image
  const nextPixel = () => {
    if (remaining === 0) return EOF
    --remaining
    const pix = data[curPixel++]
    return pix & 0xff
  }

  const output = (code) => {
    cur_accum &= masks[cur_bits]

    if (cur_bits > 0) cur_accum |= (code << cur_bits)
    else cur_accum = code

    cur_bits += n_bits

    while (cur_bits >= 8) {
      char_out((cur_accum & 0xff))
      cur_accum >>= 8
      cur_bits -= 8
    }

    // If the next entry is going to be too big for the code size,
    // then increase it, if possible.
    if (free_ent > maxcode || clear_flg) {
      if (clear_flg) {
        maxcode = MAXCODE(n_bits = g_init_bits)
        clear_flg = false
      } else {
        ++n_bits
        if (n_bits == BITS) maxcode = 1 << BITS
        else maxcode = MAXCODE(n_bits)
      }
    }

    if (code == EOFCode) {
      // At EOF, write the rest of the buffer.
      while (cur_bits > 0) {
        char_out((cur_accum & 0xff))
        cur_accum >>= 8
        cur_bits -= 8
      }
      flush_char()
    }
  }

  writeByte(initCodeSize) // write "initial code size" byte
  remaining = data.length // reset navigation variables
  curPixel = 0
  compress(initCodeSize + 1) // compress and write the pixel data
  writeByte(0) // write block terminator
}
