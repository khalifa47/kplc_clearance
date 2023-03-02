export const capitalize = (sentence: string) => {
  // Split the sentence into words
  const words = sentence.split(" ");
  // Capitalize the first letter of each word and join the words back together
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(" ");
};

// date format function
export const dateFormat = (dateString: string) => {
  const date = new Date(dateString);
  date.setHours(date.getHours() + 3);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

// searches for users by user ID, first name or last name
export const searchClearancesByUser = (
  clearances: Clearance[],
  keyword: string
) => {
  if (keyword === "") return clearances;
  return clearances.filter((clearance) => {
    const searchFields = `${clearance.user.id} ${clearance.user.firstName} ${clearance.user.lastName}`;

    const searchFieldsLowerCase = searchFields.toLowerCase();
    const keywordLowerCase = keyword.toLowerCase();

    return searchFieldsLowerCase.indexOf(keywordLowerCase) !== -1;
  });
};
