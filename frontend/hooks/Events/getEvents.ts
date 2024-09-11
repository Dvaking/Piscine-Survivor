import { client, GetEvents } from "@graphql";
import { GetEventsProps } from "@types";

interface Events {
  private_events: GetEventsProps[];
}

export async function getEvents() {
  let response: Events | undefined = undefined;
  try {
    response = await client.request(GetEvents);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_events : [];
}
