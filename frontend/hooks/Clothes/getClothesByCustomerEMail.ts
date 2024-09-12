import { client, GetClothesByCustomerEmail } from "@graphql";
import { GetClothesProps } from "@types";
import { refreshToken } from "@hooks";

export interface Clothing {
  private_customers: GetClothesProps[];
}

export async function getClothesByCustomerEmail(email: string) {
  let arg = {
    email: email,
  };
  let response: Clothing | undefined = undefined;
  try {
    response = await client.request(GetClothesByCustomerEmail, arg);
  } catch (error) {
    if ((error as any).response.errors[0].message.includes("JWTExpired")) {
      const refresh = await refreshToken();
      if (refresh) {
        try {
          response = await client.request(GetClothesByCustomerEmail, arg);
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
      } else console.log("erreur refresh token");
    }
  }
  return response ? response.private_customers : [];
}
