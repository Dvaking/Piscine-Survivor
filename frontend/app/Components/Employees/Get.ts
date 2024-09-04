import {client, GetEmployeesInformation } from "@queries";
import { GetEmployeesInformationProps } from "@types";

export interface Employee {
  private_employees: GetEmployeesInformationProps[];
}


export async function getEmployeesInformation() {
  let response: Employee | undefined = undefined;
  try {
    response = await client.request(GetEmployeesInformation);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_employees : [];
}
