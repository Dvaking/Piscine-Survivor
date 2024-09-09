import axios, { AxiosResponse } from "axios";
import { login } from "./authApi";
import { Token } from "../types/token";

const url = "https://soul-connection.fr/api/clothes";
const headers = {
  accept: "application/json",
  "X-Group-Authorization": "e6e70c63639f039518f84a0f3c517837",
};

export async function getClotheImage(
  token: Token,
  id: number
): Promise<AxiosResponse<any>> {
  const newUrl = `https://soul-connection.fr/api/clothes/${id}/image`;
  try {
    let response: AxiosResponse<any>;

    try {
      response = await axios.get(newUrl, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token.access_token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        let newToken = await login();
        response = await axios.get(newUrl, {
          headers: {
            ...headers,
            Authorization: `Bearer ${newToken.access_token}`,
          },
        });
      } else {
        throw error;
      }
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Request failed:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:");
    }
    throw new Error("Request failed");
  }
}
