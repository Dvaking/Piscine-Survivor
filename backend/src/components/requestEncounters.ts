import { EncounterProps } from "../types/encounter";
import { Client, InsertEncounter, GetCustomerById } from "../queries/";

interface Encounter {
  private_encounters: EncounterProps[];
}

export async function insertEncounter(encounter: EncounterProps) {
  let response: any;
  try {
    response = await Client.request(InsertEncounter, encounter);
    console.log("Encounter inserted successfully");
  } catch (error: any) {
    if (
      error.message.includes("duplicate key value violates unique constraint")
    ) {
      console.error("Encounter already exists");
      return null;
    }
    console.error("An error occurred while inserting encounter", error);
    return null;
  }
}
