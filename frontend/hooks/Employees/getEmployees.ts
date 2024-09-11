import { client, GetEmployees } from "@graphql";
import { refreshToken } from "@hooks";
import { GetEmployeesProps } from "@types";

export interface Employees {
  private_employees: GetEmployeesProps[];
}

export async function getEmployees() {
  let response: Employees | undefined = undefined;
  try {
    response = await client.request(GetEmployees);
  } catch (error) {
    if (
      (error as any).response &&
      (error as any).response.errors &&
      (error as any).response.errors[0].message === "JWTExpired"
    ) {
      const refresh = await refreshToken();
      if (refresh)
        try {
          response = await client.request(GetEmployees);
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
    }
  }
  return response ? response.private_employees : [];
}
