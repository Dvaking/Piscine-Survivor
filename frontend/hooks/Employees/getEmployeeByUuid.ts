import { client, GetEmployeesByUuid } from "@graphql";
import { refreshToken } from "@hooks";
import { GetEmployeesByUuidProps } from "@types";

interface EmployeesByUuid {
  private_employees: GetEmployeesByUuidProps[];
}

export async function getEmployeesInformationByUuid() {
  let response: EmployeesByUuid | undefined = undefined;
  try {
    response = await client.request(GetEmployeesByUuid);
  } catch (error) {
    if ((error as any).response.errors[0].message.includes("JWTExpired")) {
      const refresh = await refreshToken();
      if (refresh) {
        try {
          response = await client.request(GetEmployeesByUuid);
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
      } else console.log("erreur refresh token");
    }
  }
  return response ? response.private_employees : [];
}
