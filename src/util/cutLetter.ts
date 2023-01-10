export function cutLetter(letter: string, length: number) {
  if (letter.length < length) return letter;

  return `${letter.slice(0, length)}...`;
}
