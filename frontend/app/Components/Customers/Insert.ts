import { client, InsertEmployee } from "@queries";
import { InsertEmployeeProps } from "@types";

interface Employee {
  private_employees: InsertEmployeeProps[];
}

export async function insertEmployee(employees: InsertEmployeeProps) {
  let response: Employee | undefined = undefined;
  try {
    response = await client.request(InsertEmployee, employees);
    console.log("Utilisateur inséré avec succès:", response);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_employees : [];
}
