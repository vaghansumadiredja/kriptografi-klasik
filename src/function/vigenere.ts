export function EncryptVigenere(key: string, plaintext: string) {
  let ct = ''
  let pt = plaintext.toUpperCase()
  for (let i = 0; i < pt.length; i++) {
    if (pt[i].match(/[A-Z]/)) {
      ct += String.fromCharCode(((pt.charCodeAt(i) + key.charCodeAt(i % key.length)) % 26) + 65)
    } else {
      ct += pt[i];
    }
  }
  return ct
}

export function DecryptVigenere(key: string, ciphertext: string) {
  let pt = ''
  let ct = ciphertext.toUpperCase()
  for (let i = 0; i < ct.length; i++) {
    if (ct[i].match(/[A-Z]/)) {
      pt += String.fromCharCode(((((ct.charCodeAt(i) - key.charCodeAt(i % key.length)) % 26) + 26) % 26) + 65)
    } else {
      pt += ct[i];
    }
  }
  return pt
}