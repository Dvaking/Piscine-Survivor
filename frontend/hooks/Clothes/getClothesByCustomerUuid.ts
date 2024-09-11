import { client, GetClothesByCustomerUuid } from "@graphql";
import { GetClothesProps } from "@types";

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
    console.error("getClothesByCustomerUuid:", error);
  }
  return response ? response.private_customers : [];
}
