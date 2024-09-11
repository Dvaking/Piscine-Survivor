import { EncounterProps } from "../types/encounter";
import { Client, InsertEncounter, UpdateEncounter } from "../queries/";

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
    console.error("An error occurred while inserting encounter");
    return null;
  }
}

export async function updateEncounter(encounter: EncounterProps) {
  let response: any;
  try {
    response = await Client.request(UpdateEncounter, encounter);
    console.log("Encounter updated successfully");
  } catch (error: any) {
    if (
      error.message.includes("duplicate key value violates unique constraint")
    ) {
      console.error("Encounter already exists");
      return null;
    }
    console.error("An error occurred while updating encounter");
    return null;
  }
}
