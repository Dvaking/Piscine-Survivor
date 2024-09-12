import { GetEmployeeTableInformation, client } from "@graphql";
import { GetEmployeeTableInformationProps } from "@types";
import { refreshToken } from "@hooks";

interface Employees {
  private_employees: GetEmployeeTableInformationProps[];
}

export async function getEmployeeTableInformation() {
  let response: Employees | undefined = undefined;
  try {
    response = await client.request(GetEmployeeTableInformation);
  } catch (error) {
    if ((error as any).response.errors[0].message.includes("JWTExpired")) {
      const refresh = await refreshToken();
      if (refresh) {
        try {
          response = await client.request(GetEmployeeTableInformation);
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
      } else console.log("erreur refresh token");
    }
  }
  return response ? response?.private_employees : [];
}
