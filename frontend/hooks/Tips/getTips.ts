import { client, GetTips } from "@graphql";
import { GetTipsProps } from "@types";

export interface Tips {
  private_tips: GetTipsProps[];
}

export async function getTips() {
  let response: Tips | undefined = undefined;
  try {
    response = await client.request(GetTips);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_tips : [];
}
