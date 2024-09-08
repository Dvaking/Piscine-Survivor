import { client, GetEmployeesByWork } from "@graphql";
import { GetEmployeesByWorkProps } from "@types";

export interface EmployeesByWork {
  private_employees: GetEmployeesByWorkProps[];
}

export async function getEmployeesByWork() {
  let response: EmployeesByWork | undefined = undefined;
  try {
    response = await client.request(GetEmployeesByWork);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_employees : [];
}
