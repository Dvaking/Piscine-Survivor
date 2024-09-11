import { client, GetCustomersName } from "@graphql";
import { GetCustomersNameProps } from "@types";

export interface Customers {
  private_customers: GetCustomersNameProps[];
}

export async function getCustomersName() {
  let response: Customers | undefined = undefined;
  try {
    response = await client.request(GetCustomersName);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_customers : [];
}
