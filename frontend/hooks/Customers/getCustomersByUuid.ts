import { client, GetCustomersByUuid } from "@graphql";
import { GetCustomersByUuidProps } from "@types";
import { refreshToken } from "@hooks";

export interface CustomersByUuid {
  private_customers: GetCustomersByUuidProps[];
}

export async function getCustomersByUuid(uuid: string) {
  let response: CustomersByUuid | undefined = undefined;
  try {
    response = await client.request(GetCustomersByUuid, { uuid: uuid });
  } catch (error) {
    if ((error as any).response.errors[0].message.includes("JWTExpired")) {
      const refresh = await refreshToken();
      if (refresh) {
        try {
          response = await client.request(GetCustomersByUuid, { uuid: uuid });
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
      } else console.log("erreur refresh token");
    }
  }
  return response ? response.private_customers : [];
}
