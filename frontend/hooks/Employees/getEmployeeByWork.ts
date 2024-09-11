import { client, GetEmployeesByWork } from "@graphql";
import { refreshToken } from "@hooks";
import { GetEmployeesByWorkProps } from "@types";

interface EmployeesByWork {
  private_employees: GetEmployeesByWorkProps[];
}

export async function getEmployeesByWork() {
  let response: EmployeesByWork | undefined = undefined;
  try {
    response = await client.request(GetEmployeesByWork);
  } catch (error) {
    if (
      (error as any).response &&
      (error as any).response.errors &&
      (error as any).response.errors[0].message === "JWTExpired"
    ) {
      const refresh = await refreshToken();
      if (refresh)
        try {
          response = await client.request(GetEmployeesByWork);
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
    }
  }
  return response ? response.private_employees : [];
}
