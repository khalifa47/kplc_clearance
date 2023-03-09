import { EmailJSResponseStatus } from "@emailjs/browser";
import emailjs from "@emailjs/browser";

export const capitalize = (sentence: string) => {
  const words = sentence.split(" ");

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(" ");
};

// date format function
export const dateFormat = (dateString: string) => {
  const date = new Date(dateString);
  // date.setHours(date.getHours() + 3);
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
  if (keyword === "*") return clearances;
  return clearances.filter((clearance) => {
    const searchFields = `${clearance.user.id} ${clearance.user.firstName} ${clearance.user.lastName} ${clearance.user.region.name} ${clearance.user.department.name}`;

    const searchFieldsLowerCase = searchFields.toLowerCase();
    const keywordLowerCase = keyword.toLowerCase();

    return searchFieldsLowerCase.indexOf(keywordLowerCase) !== -1;
  });
};

export const sendEmail = async (
  fromName: string,
  fromId: string,
  addressedTo: String | String[]
) => {
  // sending email
  const emailParams = {
    from_name: fromName,
    from_id: fromId,
    to_address: addressedTo,
    link_to: "http://localhost:3000/admin",
  };
  const res: EmailJSResponseStatus = await emailjs.send(
    "service_r034ivr",
    "template_hsxse9p",
    emailParams,
    "faPEvDhcVnB1PzJzo"
  );
  console.log(res);
};
