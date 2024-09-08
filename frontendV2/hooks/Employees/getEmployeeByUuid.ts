import { client, GetEmployeesByUuid } from "@graphql";
import { GetEmployeesByUuidProps } from "@types";

export interface EmployeesByUuid {
  private_employees: GetEmployeesByUuidProps[];
}

export async function getEmployeesInformationByUuid() {
  let response: EmployeesByUuid | undefined = undefined;
  try {
    response = await client.request(GetEmployeesByUuid);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_employees : [];
}
