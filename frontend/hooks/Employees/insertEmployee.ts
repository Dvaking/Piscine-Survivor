import { client, InsertEmployee } from "@graphql";
import { InsertEmployeeProps } from "@types";
import { refreshToken } from "@hooks";

interface EmployeeInsert {
  private_employees: InsertEmployeeProps[];
}

export async function insertEmployee(employees: InsertEmployeeProps) {
  let response: EmployeeInsert | undefined = undefined;
  try {
    response = await client.request(InsertEmployee, employees);
    console.log("Utilisateur inséré avec succès");
  } catch (error) {
    if (
      (error as any).response &&
      (error as any).response.errors &&
      (error as any).response.errors[0].message === "JWTExpired"
    ) {
      const refresh = await refreshToken();
      if (refresh)
        try {
          response = await client.request(InsertEmployee, employees);
          console.log("Utilisateur inséré avec succès");
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
    }
  }
  return response ? response.private_employees : [];
}
