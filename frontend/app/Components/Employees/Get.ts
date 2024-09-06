import {
  client,
  GetEmployeesInformation,
  GetEmployeesInformationByUuid,
} from "@queries";
import { GetEmployeesInformationProps } from "@types";

export interface Employees {
  private_employees: GetEmployeesInformationProps[];
}

export async function getEmployeesInformation() {
  let response: Employees | undefined = undefined;
  try {
    response = await client.request(GetEmployeesInformation);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_employees : [];
}

export async function getEmployeesInformationByUuid(employeeUuid: string) {
  let args = {
    uuid: employeeUuid,
  };
  let response: Employees | undefined = undefined;
  try {
    response = await client.request(GetEmployeesInformationByUuid, args);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_employees : [];
}
