import { EmployeeProps } from "../types/employee";
import { InsertEmployee, Client, UpdateEmployee } from "../queries/";

interface Employee {
  private_employees: EmployeeProps[];
}

export async function insertEmployee(
  employee: EmployeeProps,
  employeeImage: string
) {
  let response: Employee | undefined = undefined;
  let variables = {
    ...employee,
    image: employeeImage,
  };
  try {
    response = await Client.request(InsertEmployee, variables);
    console.log("Utilisateur inséré avec succès");
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_employees : [];
}

export async function updateEmployee(
  employee: EmployeeProps,
  employeeImage: string
) {
  let response: Employee | undefined = undefined;
  let variables = {
    ...employee,
    image: employeeImage,
  };
  try {
    response = await Client.request(UpdateEmployee, variables);
    console.log("Utilisateur mis à jour avec succès");
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
  }
  return response ? response.private_employees : [];
}
