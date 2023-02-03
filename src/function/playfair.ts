export function prepareKey(string: string) {
  return (string.toUpperCase().replace(/J/g, "I") + "ABCDEFGHIKLMNOPQRSTUVWXYZ")
    .split('')
    .filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    })
    .join('').replace(" ", "");
}

export function createMatrix(key: string) {
  let matrix = []
  let row = []
  for (let i = 0; i < 5; i++) {
    row = []
    for (let j = 0; j < 5; j++) {
      row.push(key[i * 5 + j])
    }
    matrix.push(row)
  }
  return matrix
}

export function formatPlaintext(plaintext: string) {
  let pt = plaintext.toUpperCase().split(" ").join("")
  let formated_pt = ""
  let prevchar = ""
  for (const element of pt) {
    if (element !== prevchar) {
      formated_pt += element
    } else {
      formated_pt += "X"
      formated_pt += element
    }
    prevchar = element
  }
  if (formated_pt.length % 2 == 1) {
    formated_pt += "X"
  }
  let spaced = formated_pt.match(/.{1,2}/g)
  if (spaced) {
    return spaced.join(" ")
  }
  return ""
}

function searchColRow(matrix: string[][], char: string) {
  for (let i = 0; i < 5; i++) {
    let col = matrix[i].indexOf(char.toUpperCase())
    if (col >= 0) {
      return {
        row: i,
        col
      }
    }
  }
  return { row: -1, col: -1 }
}

export function EncryptPlayfair(plaintext: string, key: string) {
  let pt = formatPlaintext(plaintext)
  let mat = createMatrix(prepareKey(key))
  let ct = ""
  for (let i = 0; i < pt.length - 1; i += 3) {
    let char1 = searchColRow(mat, pt[i])
    let char2 = searchColRow(mat, pt[i + 1])
    if (char1.row === char2.row) {
      ct += mat[char1.row][(char1.col + 1) % 5]
      ct += mat[char2.row][(char2.col + 1) % 5]
    } else if (char1.col === char2.col) {
      ct += mat[(char1.row + 1) % 5][char1.col]
      ct += mat[(char2.row + 1) % 5][char2.col]
    } else {
      ct += mat[char1.row][char2.col]
      ct += mat[char2.row][char1.col]
    }
    ct += " "
  }
  return ct
}
export function DecryptPlayfair(plaintext: string, key: string) {
  let pt = formatPlaintext(plaintext)
  let mat = createMatrix(prepareKey(key))
  let ct = ""
  for (let i = 0; i < pt.length - 1; i += 3) {
    let char1 = searchColRow(mat, pt[i])
    let char2 = searchColRow(mat, pt[i + 1])
    if (char1.row === char2.row) {

      ct += mat[char1.row][char1.col === 0 ? 4 : char1.col - 1]
      ct += mat[char2.row][char2.col === 0 ? 4 : char2.col - 1]
    } else if (char1.col === char2.col) {
      ct += mat[char1.row === 0 ? 4 : char1.row - 1][char1.col]
      ct += mat[char2.row === 0 ? 4 : char2.row - 1][char2.col]
    } else {
      ct += mat[char1.row][char2.col]
      ct += mat[char2.row][char1.col]
    }
    ct += " "
  }
  return ct
}
