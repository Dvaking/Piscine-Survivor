import { Client, GetUserByEmail } from "../queries";
import { InterfaceUser } from "./types";

export async function getUserByEmail(email: string): Promise<{
  role: string;
  employee_uuid: string;
  customer_uuid: string;
  password: string;
}> {
  let response: InterfaceUser | undefined = undefined;
  let returnedUser = {
    role: "NoUser",
    employee_uuid: "",
    customer_uuid: "",
    password: "",
  };
  try {
    response = await Client.request(GetUserByEmail, { email: email });
    if (!response) return returnedUser;
    returnedUser.customer_uuid = response.users[0].customer_uuid;
    returnedUser.employee_uuid = response.users[0].employee_uuid;
    returnedUser.role = response.users[0].role;
    returnedUser.password = response.users[0].password;
    return returnedUser;
  } catch (error) {
    console.error("Lors du get du User");
    return returnedUser;
  }
}