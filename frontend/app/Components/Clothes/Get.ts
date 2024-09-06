import {
    client,
    GetClothesByCustomerEMail,
  } from "@queries";
  import {
    GetClothesProps,
  } from "@types";

export interface Clothes {
  private_customers: GetClothesProps[];
}

export async function getClothesByCustomerEMail(email: string) {
    let arg = {
      email: email,
    }
    let response: Clothes | undefined = undefined;
    try {
      response = await client.request(GetClothesByCustomerEMail, arg);
    } catch (error) {
      console.error("Erreur lors de l'insertion:", error);
    }
    return response ? response.private_customers : [];
  }