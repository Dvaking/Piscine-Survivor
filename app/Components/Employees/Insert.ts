import { InsertEmployee, InsertEmployeeProps, client } from "@backend";

export async function insertUser(employees: InsertEmployeeProps) {
  try {
    const response = await client.request(InsertEmployee, employees);
    console.log(
      "Utilisateur inséré avec succès:",
      (response as any).insert_users_one
    );
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
}
