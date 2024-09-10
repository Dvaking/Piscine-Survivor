import { client, InsertEmployee } from "@graphql";
import { InsertEmployeeProps } from "@types";

interface EmployeeInsert {
  private_employees: InsertEmployeeProps[];
}

export async function insertEmployee(employees: InsertEmployeeProps) {
  let response: EmployeeInsert | undefined = undefined;
  try {
    response = await client.request(InsertEmployee, employees);
    console.log("Utilisateur inséré avec succès:");
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_employees : [];
}
