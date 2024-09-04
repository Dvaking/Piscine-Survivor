import {GetEmployeesInformationProps,
  GetEmployeesInformation,
} from "@backend";
import { client } from "@backend";

interface Employee {
  private_employees: GetEmployeesInformationProps[];
}


export async function getEmployeesInformation() {
  let response: Employee | undefined = undefined;
  try {
    response = await client.request(GetEmployeesInformation);
    console.log("Utilisateur inséré avec succès:", response?.private_employees);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_employees : [];
}
