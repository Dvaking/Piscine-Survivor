import {
  client,
  GetEmployeesInformation,
  GetEmployeesInformationByUuid,
  GetClothesByCustomerEMail,
} from "@queries";
import {
  GetEmployeesInformationProps,
  GetEmployeesInformationByUuidProps,
  GetClothesProps,
} from "@types";

export interface Employees {
  private_employees:
    | GetEmployeesInformationProps[]
    | GetEmployeesInformationByUuidProps[];
}

export interface Clothes {
  private_customers: GetClothesProps[];
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

export async function getClothesByCustomerEMail(email: string) {
  let arg = {
    email: email,
  }
  let response: Clothes | undefined = undefined;
  try {
    response = await client.request(GetClothesByCustomerEMail, arg);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  console.log(response);
  return response ? response.private_customers : [];
}