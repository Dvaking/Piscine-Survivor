import { InsertUser, Client } from "../queries";

type UserInsert = {
  customer_uuid?: string;
  employee_uuid?: string;
  password: String;
  role: String;
  email: String;
};

export async function insertUser(
  email: string,
  password: string,
  role: string,
  uuid: string
) {
  let variables: UserInsert = {
    email,
    password,
    role,
  };

  if (role.toLowerCase() != "customer") variables.employee_uuid = uuid;
  else variables.customer_uuid = uuid;

  try {
    const reponse = await Client.request(InsertUser, variables);
    console.log(reponse);
  } catch (error) {
    console.log("Erreur lors de l'insertion:", error);
  }
}
