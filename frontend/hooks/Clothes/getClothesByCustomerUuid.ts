import { client, GetClothesByCustomerUuid } from "@graphql";
import { GetClothesProps } from "@types";
import { refreshToken } from "@hooks";

export interface Clothes {
  private_customers: GetClothesProps[];
}

export async function getClothesByCustomerUuid(uuid: string) {
  let arg = {
    uuid: uuid,
  };
  let response: Clothes | undefined = undefined;
  try {
    response = await client.request(GetClothesByCustomerUuid, arg);
  } catch (error) {
    if ((error as any).response.errors[0].message.includes("JWTExpired")) {
      const refresh = await refreshToken();
      if (refresh) {
        try {
          response = await client.request(GetClothesByCustomerUuid, arg);
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
      } else console.log("erreur refresh token");
    }
  }
  return response ? response.private_customers : [];
}
