import {UpdateCustomerAssign, client} from "@graphql";
import { GetEmployeesProps} from "@types";

export async function updateCustomerAssign(employee_uuid: string, customer_uuid: string) {
    let response: GetEmployeesProps | undefined
    try {
      response = await client.request(UpdateCustomerAssign, {employee_uuid, customer_uuid});
    } catch (error) {
      console.error("Error during insertion:", error);
    }
  return response ? response : undefined;
}
