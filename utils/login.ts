import data from "dummy.json";
import { binarySearch } from "./binarySearch";

export const login = async ({
  staff_id,
  password,
}: {
  staff_id: number;
  password: string;
}) => {
  // fetch data
  const user_id = binarySearch(
    data.users.map((user) => user.id),
    staff_id
  ); // assume autoincrement ID

  // verify its existence
  if (!user_id) throw "User does not exist";

  // validate it
  const user = data.users.find((user) => user.id === staff_id);

  if (user!!.password !== password) throw "Invalid credentials";

  // log in and snackbar yum
  // async section
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};
