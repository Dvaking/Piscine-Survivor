import { client, GetCoachNameByUuid } from "@graphql";
import { refreshToken } from "@hooks";
import { GetCoachNameByUuidProps } from "@types";

interface Employees {
  private_employees: GetCoachNameByUuidProps[];
}

export async function getCoachNameByUuid(uuid: string) {
  let response: Employees | undefined = undefined;
  try {
    response = await client.request(GetCoachNameByUuid, { uuid: uuid });
  } catch (error) {
    if (
      (error as any).response &&
      (error as any).response.errors &&
      (error as any).response.errors[0].message === "JWTExpired"
    ) {
      const refresh = await refreshToken();
      if (refresh)
        try {
          response = await client.request(GetCoachNameByUuid, { uuid: uuid });
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
    }
  }
  return response ? response.private_employees : [];
}
