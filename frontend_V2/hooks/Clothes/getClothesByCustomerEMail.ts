import { client, GetClothesByCustomerEmail } from "@graphql";
import { GetClothesProps } from "@types";

export interface Clothes {
  private_customers: GetClothesProps[];
}

export async function getClothesByCustomerEmail(email: string) {
  let arg = {
    email: email,
  };
  let response: Clothes | undefined = undefined;
  try {
    response = await client.request(GetClothesByCustomerEmail, arg);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_customers : [];
}
