import { client, GetCustomersByUuid } from "@graphql";
import { GetCustomersProps } from "@types";

export interface CustomersByUuid {
  private_customers: GetCustomersProps[];
}

export async function getCustomersByUuid() {
  let response: CustomersByUuid | undefined = undefined;
  try {
    response = await client.request(GetCustomersByUuid);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_customers : [];
}
