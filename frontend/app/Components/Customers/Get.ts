import {
  client,
  GetCustomersInformation,
  GetCustomersInformationByUuid,
} from "@queries";
import {
  GetCustomersInformationProps,
  GetCustomersInformationByUuidProps,
} from "@types";

export interface Customers {
  private_customers:
    | GetCustomersInformationProps[]
    | GetCustomersInformationByUuidProps[];
}

export async function getCustomersInformation() {
  let response: Customers | undefined = undefined;
  try {
    response = await client.request(GetCustomersInformation);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_customers : [];
}

export async function getCustomersInformationByUuid() {
  let response: Customers | undefined = undefined;
  try {
    response = await client.request(GetCustomersInformationByUuid);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_customers : [];
}
