import { ClotheProps } from "../types/clothe";
import { Client, InsertClothe } from "../queries/";

interface Clothe {
  private_clothes: ClotheProps[];
}

export async function insertClothe(
  clothe: ClotheProps,
  image: string | string
) {
  let response: Clothe | undefined = undefined;
  let variables = { ...clothe, image };

  if (variables.image === undefined) {
    variables.image = "";
  }

  try {
    response = await Client.request(InsertClothe, variables);
    console.log("Clothe inserted successfully");
  } catch (error) {
    console.error("Error inserting clothe");
  }
  return response ? response.private_clothes : [];
}
