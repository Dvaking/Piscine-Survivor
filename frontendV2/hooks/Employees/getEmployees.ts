import { client, GetEmployees } from "@graphql";
import { GetEmployeesProps } from "@types";

export interface Employees {
  private_employees: GetEmployeesProps[];
}

export async function getEmployees() {
  let response: Employees | undefined = undefined;
  try {
    response = await client.request(GetEmployees);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_employees : [];
}
