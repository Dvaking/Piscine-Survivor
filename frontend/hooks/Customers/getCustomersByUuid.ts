import { client, GetCustomersByUuid } from "@graphql";
import { GetCustomersByUuidProps } from "@types";

export interface CustomersByUuid {
  private_customers: GetCustomersByUuidProps[];
}

export async function getCustomersByUuid(uuid: string) {
  let response: CustomersByUuid| undefined = undefined;
  try {
    response = await client.request(GetCustomersByUuid, {uuid: uuid});
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_customers : [];
}
