import { EventProps } from "../types/event";
import { Client, InsertEvent } from "../queries/";

interface Event {
  private_events: EventProps[];
}

export async function insertEvent(event: EventProps): Promise<any> {
  let response: Event | undefined = undefined;
  try {
    response = await Client.request(InsertEvent, event);
    console.log("Événement inséré avec succès");
    return response;
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'événement", error);
    return null;
  }
}
