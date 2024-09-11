import { EncounterProps } from "../types/encounter";
import { Client, InsertEncounter, GetCustomerById } from "../queries/";

interface Encounter {
  private_encounters: EncounterProps[];
}

interface CustomerResponse {
  private_customers: { uuid: string }[];
}

async function getCustomerUuidById(id: number): Promise<string> {
  try {
    const response = await Client.request<CustomerResponse>(GetCustomerById, {
      id,
    });

    if (response.private_customers && response.private_customers.length > 0) {
      return response.private_customers[0].uuid;
    } else {
      return "";
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        "Erreur lors de la récupération de l'uuid de l'employé",
        error.message
      );
    } else {
      console.error(
        "Erreur inconnue lors de la récupération de l'uuid de l'employé",
        error
      );
    }
    return "";
  }
}

export async function insertEncounter(encounter: EncounterProps) {
  let response: any;
  try {
    let { customer_id, ...restOfEvent } = encounter;
    let variables = {
      ...restOfEvent,
      customer_uuid: await getCustomerUuidById(customer_id),
    };
    response = await Client.request(InsertEncounter, variables);
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
