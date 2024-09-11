import { ClotheProps } from "../types/clothe";
import { Client, InsertClothe, UpdateClothe } from "../queries/";

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

export async function updateClothe(
  clothe: ClotheProps,
  image: string | string
) {
  let response: Clothe | undefined = undefined;
  let variables = { ...clothe, image };

  if (variables.image === undefined) {
    variables.image = "";
  }

  try {
    response = await Client.request(UpdateClothe, variables);
    console.log("Clothe updated successfully");
  } catch (error) {
    console.error("Error updating clothe");
  }
  return response ? response.private_clothes : [];
}
