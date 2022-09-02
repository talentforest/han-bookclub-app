export function cutLetter(letter: string, length: number) {
  if (letter.length < length) {
    return letter;
  } else {
    return `${letter.slice(0, length)}...`;
  }
}
