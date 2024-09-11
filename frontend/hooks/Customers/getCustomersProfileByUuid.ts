import { client, GetCustomersProfileByUuid } from "@graphql";
import { refreshToken } from "@hooks";
import { GetCustomersProfileByUuidProps } from "@types";

export interface CustomersProfileByUuid {
  private_customers: GetCustomersProfileByUuidProps[];
}

export async function getCustomersProfileByUuid(uuid: string) {
  let response: CustomersProfileByUuid | undefined = undefined;
  try {
    response = await client.request(GetCustomersProfileByUuid, { uuid: uuid });
  } catch (error) {
    if (
      (error as any).response &&
      (error as any).response.errors &&
      (error as any).response.errors[0].message === "JWTExpired"
    ) {
      const refresh = await refreshToken();
      if (refresh)
        try {
          response = await client.request(GetCustomersProfileByUuid, { uuid: uuid });
          console.log("Utilisateur inséré avec succès");
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
    }
  }
  return response ? response.private_customers : [];
}
