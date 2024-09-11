import { client, GetEmployeesNameByWork } from "@graphql";
import { GetEmployeesNameByWorkProps } from "@types";

export interface Employees {
  private_employees: GetEmployeesNameByWorkProps[];
}

export async function getEmployeesNameByWork() {
  let response: Employees | undefined = undefined;
  try {
    response = await client.request(GetEmployeesNameByWork);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_employees : [];
}
