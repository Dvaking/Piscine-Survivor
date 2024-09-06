import {
  client,
  GetEmployeesInformation,
  GetEmployeesInformationByUuid,
  GetEmployeesInformationByWork
} from "@queries";
import {
  GetEmployeesInformationProps,
  GetEmployeesInformationByUuidProps,
  GetEmployeesInformationByWorkProps
} from "@types";

export interface Employees {
  private_employees:
    | GetEmployeesInformationProps[]
    | GetEmployeesInformationByUuidProps[];
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

export async function getEmployeesInformationByUuid() {
  let response: Employees | undefined = undefined;
  try {
    response = await client.request(GetEmployeesInformationByUuid);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_employees : [];
}

export async function getEmployeesInformationByWork() {
  let response: Employees | undefined = undefined;
  try {
    response = await client.request(GetEmployeesInformationByWork);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_employees : [];
}
