import { EventProps } from "../types/event";
import { Client, InsertEvent, GetEmployeeUuidById } from "../queries/";
import { UUID } from "crypto";

interface Event {
  private_events: EventProps[];
}

type EmployeeResponse = {
  private_employees: { uuid: string }[];
};

export async function getUuidById(id: number): Promise<string> {
  try {
    const response = await Client.request<EmployeeResponse>(
      GetEmployeeUuidById,
      { id }
    );

    console.log("UUID de l'employé récupéré avec succès", response);

    if (response.private_employees && response.private_employees.length > 0) {
      return response.private_employees[0].uuid;
    } else {
      console.error("Aucun employé trouvé avec cet id");
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

export async function insertEvent(event: EventProps): Promise<any> {
  let response: Event | undefined = undefined;
  try {
    let { employee_id, ...restOfEvent } = event;
    let variables = {
      ...restOfEvent,
      employee_uuid: await getUuidById(employee_id),
    };
    response = await Client.request(InsertEvent, variables);
    console.log("Événement inséré avec succès");
    return response;
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'événement", error);
    return null;
  }
}
