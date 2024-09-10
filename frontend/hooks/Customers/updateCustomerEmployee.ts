import { client, UpdateCustomerEmployee } from "@graphql";

export async function updateCustomerEmployee(uuid: string, employee_uuid: string) {
    let response: any = undefined;
    try {
        response = await client.request(UpdateCustomerEmployee, { uuid, employee_uuid });
    } catch (error) {
        console.error("Erreur lors de l'insertion:", error);
    }
    return response;
}
