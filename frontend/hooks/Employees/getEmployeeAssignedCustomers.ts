import { client, GetEmployeesAssignedCustomers } from "@graphql";
import { refreshToken } from "@hooks";
import { GetEmployeesAssignedCustomersProps } from "@types";

export interface EmployeesAssignedCustomers {
  private_employees: GetEmployeesAssignedCustomersProps[];
}

export async function getEmployeesAssignedCustomers() {
  let response: EmployeesAssignedCustomers | undefined = undefined;
  try {
    response = await client.request(GetEmployeesAssignedCustomers);
  } catch (error) {
    if (
      (error as any).response &&
      (error as any).response.errors &&
      (error as any).response.errors[0].message === "JWTExpired"
    ) {
      const refresh = await refreshToken();
      if (refresh)
        try {
          response = await client.request(GetEmployeesAssignedCustomers);
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
    }
  }
  return response ? response.private_employees : [];
}
