import { client, GetEmployeesNameByWork } from "@graphql";
import { GetEmployeesNameByWorkProps } from "@types";

export interface EmployeesName {
  private_employees: GetEmployeesNameByWorkProps[];
}

export async function getEmployeeNameByWork() {
  let response: EmployeesName | undefined = undefined;
  try {
    response = await client.request(GetEmployeesNameByWork);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_employees : [];
}
