import { ClotheProps } from "../types/clothe";
import { Client, InsertClothe } from "../queries/";

interface Clothe {
  private_clothes: ClotheProps[];
}

export async function insertClothe(clothe: ClotheProps, image: string | string) {
  let response: Clothe | undefined = undefined;
  let variables = { ...clothe, image };

  if (variables.image === undefined) {
    variables.image = "";
  }

  try {
    response = await Client.request(InsertClothe, variables);
    console.log("Vêtement inséré avec succès");
  } catch (error) {
    console.error("Erreur lors de l'insertion de vêtement", error);
  }
  return response ? response.private_clothes : [];
}
