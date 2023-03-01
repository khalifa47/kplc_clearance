export const capitalize = (sentence: string) => {
  // Split the sentence into words
  const words = sentence.split(" ");
  // Capitalize the first letter of each word and join the words back together
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(" ");
};
