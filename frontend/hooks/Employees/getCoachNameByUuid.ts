import { client, GetCoachNameByUuid } from "@graphql";
import { GetCoachNameByUuidProps } from "@types";

interface Employees {
  private_employees: GetCoachNameByUuidProps[];
}

export async function getCoachNameByUuid(uuid: string) {
  let response: Employees | undefined = undefined;
  try {
    response = await client.request(GetCoachNameByUuid, { uuid: uuid });
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_employees : [];
}
