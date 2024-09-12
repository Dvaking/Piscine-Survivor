import { client, GetEncounters } from "@graphql";
import { GetEncountersProps } from "@types";

interface Encounters {
  private_encounters: GetEncountersProps[];
}

export async function getEncounters() {
  let response: Encounters | undefined = undefined;
  try {
    response = await client.request(GetEncounters);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_encounters : [];
}
