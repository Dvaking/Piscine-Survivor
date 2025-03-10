import { UpdateCustomerAssign, client } from "@graphql";
import { refreshToken } from "@hooks";
import { GetEmployeesProps } from "@types";

export async function updateCustomerAssign(
  employee_uuid: string,
  customer_uuid: string
) {
  let response: GetEmployeesProps | undefined;
  try {
    response = await client.request(UpdateCustomerAssign, {
      employee_uuid,
      customer_uuid,
    });
  } catch (error) {
    if ((error as any).response.errors[0].message.includes("JWTExpired")) {
      const refresh = await refreshToken();
      if (refresh) {
        try {
          response = await client.request(UpdateCustomerAssign, {employee_uuid, customer_uuid});
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
      } else console.log("erreur refresh token");
    }
  }
  return response ? response : undefined;
}
