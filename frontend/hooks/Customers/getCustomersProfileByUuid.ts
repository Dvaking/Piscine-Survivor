import { client, GetCustomersProfileByUuid } from "@graphql";
import { GetCustomersProfileByUuidProps } from "@types";

export interface CustomersProfileByUuid {
  private_customers: GetCustomersProfileByUuidProps[];
}

export async function getCustomersProfileByUuid(uuid: string) {
  let response: CustomersProfileByUuid| undefined = undefined;
  try {
    response = await client.request(GetCustomersProfileByUuid, {uuid: uuid});
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_customers : [];
}
