import { EventProps } from "../types/event";
import { Client, InsertEvent, GetEmployeeUuidById } from "../queries/";

interface Event {
  private_events: EventProps[];
}

export async function insertEvent(event: EventProps): Promise<any> {
  let response: Event | undefined = undefined;
  try {
    response = await Client.request(InsertEvent, event);
    console.log("Event inserted successfully");
    return response;
  } catch (error) {
    console.error("Error inserting event");
    return null;
  }
}
