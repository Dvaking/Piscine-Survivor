import { TipProps } from "../types/";
import { InsertTip, Client } from "../queries/";

interface Tip {
  private_tip: TipProps[];
}

export async function insertTip(tip: TipProps) {
  let response: Tip | undefined = undefined;

  try {
    response = await Client.request(InsertTip, tip);
    console.log("Conseil inséré avec succès");
  } catch (error) {
    console.error("Erreur lors de l'insertion du conseil", error);
  }
  return response ? response.private_tip : [];
}
