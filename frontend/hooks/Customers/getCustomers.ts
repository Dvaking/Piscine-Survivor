import { client, GetCustomers } from "@graphql";
import { GetCustomersProps } from "@types";

export interface Customers {
  private_customers: GetCustomersProps[];
}

export async function getCustomers() {
  let response: Customers | undefined = undefined;
  try {
    response = await client.request(GetCustomers);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_customers : [];
}
