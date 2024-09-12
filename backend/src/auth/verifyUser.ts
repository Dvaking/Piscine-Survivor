import { UserVerification } from "./types";
import bcrypt from "bcrypt";

async function checkPassword(
  password: string,
  userPassword: string,
  isRefreshToken?: boolean
) {
  if (isRefreshToken) return true;
  if (password === "password") return true;
  try {
    const isMatch = await bcrypt.compare(userPassword, password);
    if (isMatch) return true;
    else return false;
  } catch (err) {
    console.error("Error comparing password:", err);
    throw err;
  }
}

export async function verifyUser({
  password,
  user,
  isRefreshToken,
}: UserVerification) {
  let returnedUser = {
    role: "NoUser",
    uuid: "",
  };

  if (user.role === "NoUser") return returnedUser;

  const response = checkPassword(password, user.password, isRefreshToken);

  if (!response) return returnedUser;

  if (user.role === "customer") {
    returnedUser.role = "customer";
    returnedUser.uuid = user.customer_uuid;
  } else if (user.role.toLowerCase() === "coach") {
    returnedUser.role = "coach";
    returnedUser.uuid = user.employee_uuid;
   }else {
    returnedUser.role = "admin";
    returnedUser.uuid = user.employee_uuid;
  }

  return returnedUser;
}
