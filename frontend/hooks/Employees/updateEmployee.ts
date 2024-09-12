import { UpdateEmployee, client } from "@graphql";
import { refreshToken } from "@hooks";
import { UpdateEmployeeProps } from "@types";

export async function updateEmployee(props: UpdateEmployeeProps) {
  let response: UpdateEmployeeProps | undefined;
  try {
    response = await client.request(UpdateEmployee, props);
  } catch (error) {
    if ((error as any).response.errors[0].message.includes("JWTExpired")) {
      const refresh = await refreshToken();
      if (refresh) {
        try {
          response = await client.request(UpdateEmployee, props);
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
      } else console.log("erreur refresh token");
    }
  }
  return response ? response : undefined;
}
