import { HowManyEmployees, client } from "@graphql";
import { HowManyEmployeesProps } from "@types";
import { refreshToken } from "@hooks";

interface Employees {
  private_employees: HowManyEmployeesProps[];
}

export async function howManyEmployees() {
  let response: Employees | undefined = undefined;
  try {
    response = await client.request(HowManyEmployees);
  } catch (error) {
    if ((error as any).response.errors[0].message.includes("JWTExpired")) {
      const refresh = await refreshToken();
      if (refresh) {
        try {
          response = await client.request(HowManyEmployees);
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
      } else console.log("erreur refresh token");
    }
  }
  return response ? response?.private_employees : [];
}
