export const upperCaseFirstLetter = (word: string): string =>
  word.length > 0
    ? word[0].toUpperCase() + word.substring(1).toLowerCase()
    : word;

export const getDateAndTime = (date: string | Date): string =>
  new Date(date).toLocaleDateString() +
  ' ' +
  new Date(date).toLocaleTimeString();
