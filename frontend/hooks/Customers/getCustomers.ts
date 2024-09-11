import { client, GetCustomers } from "@graphql";
import { GetCustomersProps } from "@types";
import { refreshToken } from "@hooks";

export interface Customers {
  private_customers: GetCustomersProps[];
}

export async function getCustomers() {
  let response: Customers | undefined = undefined;
  try {
    response = await client.request(GetCustomers);
  } catch (error) {
    if (
      (error as any).response &&
      (error as any).response.errors &&
      (error as any).response.errors[0].message === "JWTExpired"
    ) {
      const refresh = await refreshToken();
      if (refresh)
        try {
          response = await client.request(GetCustomers);
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
    }
  }
  return response ? response.private_customers : [];
}
