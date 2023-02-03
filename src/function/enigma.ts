const ROTOR1 = "DMTWSILRUYQNKFEJCAZBPGXOHV"
const ROTOR2 = "HQZGPJTMOBLNCIFDYAWVEUSRKX"
const ROTOR3 = "UQNTLSZFMREHDPXKIBVYGJCWOA"
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const reflector = "RYULQSHGPXNDOKMIEAFZCWVJBT"




function ltr(char: string, rotor: string, ring: number) {
  let idx = (alphabet.indexOf(char) + ring) % 26
  return rotor[idx]
}

function rtl(char: string, rotor: string, ring: number) {
  let idx = (rotor.indexOf(char) - ring + 26) % 26
  return alphabet[idx]
}



export function Enigma(plaintext: string, key1: number, key2: number, key3: number) {
  let ring1 = key1 % 26
  let ring2 = key2 % 26
  let ring3 = key3 % 26
  let ct = ""
  const pt = plaintext.toUpperCase()
  for (const char of pt) {
    if (char.match(/[A-Z]/)) {
      let char_buf = char
      char_buf = ltr(char_buf, ROTOR3, ring3)
      char_buf = ltr(char_buf, ROTOR2, ring2)
      char_buf = ltr(char_buf, ROTOR1, ring1)

      char_buf = reflector[alphabet.indexOf(char_buf)]

      char_buf = rtl(char_buf, ROTOR1, ring1)
      char_buf = rtl(char_buf, ROTOR2, ring2)
      char_buf = rtl(char_buf, ROTOR3, ring3)

      ct += char_buf

      ring3++
      if (ring3 > 25) {
        ring2++
        ring3 = 0
        if (ring2 > 25) {
          ring1++
          ring2 = 0
          if (ring1 > 25) {
            ring1 = 0
          }
        }
      }

    } else {
      ct += char;
    }
  }
  return { ct, ring1, ring2, ring3 }
}
