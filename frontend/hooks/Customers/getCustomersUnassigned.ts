import { GetCustomersUnassigned, client } from "@graphql";
import { GetCustomersUnassignedProps } from "@types";
import { refreshToken } from "@hooks";

interface Customers {
  private_customers: GetCustomersUnassignedProps[];
}

export async function getCustomersUnassigned() {
  let response: Customers | undefined = undefined;
  try {
    response = await client.request(GetCustomersUnassigned);
  } catch (error) {
    if ((error as any).response.errors[0].message.includes("JWTExpired")) {
      const refresh = await refreshToken();
      if (refresh) {
        try {
          response = await client.request(GetCustomersUnassigned);
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
      } else console.log("erreur refresh token");
    }
  }
  return response ? response.private_customers : [];
}
