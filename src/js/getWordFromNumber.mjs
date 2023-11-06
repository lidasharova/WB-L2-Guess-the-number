export const getWordFromNumber = (number, textForms) => {
  if (number === 1) {
    return `1 ${textForms[0]}`;
  } else if (number >= 2 && number <= 4) {
    return `${number} ${textForms[1]}`;
  } else {
    return `${number} ${textForms[2]}`;
  }
};

// textForms - это массив со словами в форме -  [Им.п ед, Род.п ед, Род.п множ]
