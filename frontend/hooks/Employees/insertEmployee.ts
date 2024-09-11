import { client, InsertEmployee } from "@graphql";
import { InsertEmployeeProps, ResponseInsertEmployeeProps } from "@types";
import { refreshToken } from "@hooks";

interface EmployeeInsert {
  insert_private_employees: {
    affected_rows: number;
    returning: ResponseInsertEmployeeProps[];
  };
}

export async function insertEmployee(employees: InsertEmployeeProps) {
  let response: EmployeeInsert | undefined = undefined;
  try {
    response = await client.request(InsertEmployee, employees);
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
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
    }
  }
  return response ? response.insert_private_employees.returning[0] : "";
}
