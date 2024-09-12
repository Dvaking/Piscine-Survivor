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
    if ((error as any).response.errors[0].message.includes("JWTExpired")) {
      const refresh = await refreshToken();
      if (refresh) {
        try {
          response = await client.request(GetEmployeesAssignedCustomers);
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
      } else console.log("erreur refresh token");
    }
  }
  return response ? response.private_employees : [];
}
