import { client, GetEmployeesAssignedCustomers } from "@graphql";
import { GetEmployeesAssignedCustomersProps } from "@types";

export interface EmployeesAssignedCustomers {
  private_employees: GetEmployeesAssignedCustomersProps[];
}

export async function getEmployeesAssignedCustomers() {
  let response: EmployeesAssignedCustomers | undefined = undefined;
  try {
    response = await client.request(GetEmployeesAssignedCustomers);
    console.log(response);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_employees : [];
}
