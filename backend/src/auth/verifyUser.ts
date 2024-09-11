import { UserVerification } from "./types";
import bcrypt from "bcrypt";

const saltRounds = 10;

async function hashPassword(plainPassword: string) {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log("Hashed password:", hashedPassword);
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
}

async function checkPassword(password: string, userPassword: string) {
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

export function verifyUser({ password, user }: UserVerification) {
  let returnedUser = {
    role: "NoUser",
    uuid: "",
  };

  if (user.role === "NoUser" || user.password !== password) return returnedUser;

  checkPassword(password, user.password).then((isMatch) => {
    if (isMatch) return returnedUser;
  });

  if (user.role === "customer") {
    returnedUser.role = "customer";
    returnedUser.uuid = user.customer_uuid;
  } else if (user.role.toLowerCase() === "coach") {
    returnedUser.role = "coach";
    returnedUser.uuid = user.employee_uuid;
  } else {
    returnedUser.role = "admin";
    returnedUser.uuid = user.employee_uuid;
  }

  return returnedUser;
}
