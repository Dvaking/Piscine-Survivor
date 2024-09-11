import { client, UpdateCustomerEmployee } from "@graphql";
import { refreshToken } from "@hooks";

export async function updateCustomerEmployee(uuid: string, employee_uuid: string) {
    let response: any = undefined;
    try {
        response = await client.request(UpdateCustomerEmployee, { uuid, employee_uuid });
    } catch (error) {
        if (
            (error as any).response &&
            (error as any).response.errors &&
            (error as any).response.errors[0].message === "JWTExpired"
          ) {
            const refresh = await refreshToken();
            if (refresh)
              try {
                response = await client.request(UpdateCustomerEmployee, { uuid, employee_uuid });
                console.log("Utilisateur inséré avec succès");
              } catch (error) {
                console.error("Erreur lors de l'insertion:", error);
              }
          }
    }
    return response;
}
