import { client, GetTips } from "@graphql";
import { refreshToken } from "@hooks";
import { GetTipsProps } from "@types";

export interface Tips {
  private_tips: GetTipsProps[];
}

export async function getTips() {
  let response: Tips | undefined = undefined;
  try {
    response = await client.request(GetTips);
  } catch (error) {
    if ((error as any).response.errors[0].message.includes("JWTExpired")) {
      const refresh = await refreshToken();
      if (refresh) {
        try {
          response = await client.request(GetTips);
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
      } else console.log("erreur refresh token");
    }
  }
  return response ? response.private_tips : [];
}
