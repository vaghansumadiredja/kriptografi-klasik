export function EncryptExtendedVigenere(key: string, plaintext: string) {
  let ct = ''
  let pt = plaintext
  for (let i = 0; i < pt.length; i++) {
    if (pt[i] === " ") {
      ct += pt[i];
    } else {
      ct += String.fromCharCode(((pt.charCodeAt(i) + key.charCodeAt(i % key.length)) % 255))
    }
  }
  return ct
}

export function DecryptExtendedVigenere(key: string, ciphertext: string) {
  let pt = ''
  let ct = ciphertext
  for (let i = 0; i < ct.length; i++) {
    if (ct[i] === " ") {
      pt += ct[i];
    } else {
      pt += String.fromCharCode(((((ct.charCodeAt(i) - key.charCodeAt(i % key.length)) % 255)) % 255))
    }
  }
  return pt
}
