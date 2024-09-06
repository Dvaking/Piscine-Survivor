import { UpdateEmployee, client } from "@queries";
import { UpdateEmployeeProps } from "@types";

export async function updateEmployee(props: UpdateEmployeeProps) {
    let response: UpdateEmployeeProps | undefined
    try {
      response = await client.request(UpdateEmployee, props);
    } catch (error) {
      console.error("Erreur lors de l'insertion:", error);
    }
  return response ? response : undefined;
}