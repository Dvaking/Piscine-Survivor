import axios, { AxiosResponse } from "axios";
import { login } from "./authApi";
import { get } from "http";
import { Token } from "../types/token";

const url = "https://soul-connection.fr/api/employees";
const headers = {
  accept: "application/json",
  "X-Group-Authorization": "e6e70c63639f039518f84a0f3c517837",
};

export async function getEmployees(token: Token): Promise<AxiosResponse<any>> {
  try {
    let response: AxiosResponse<any>;

    try {
      response = await axios.get(url, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token.access_token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        let newToken = await login();
        response = await axios.get(url, {
          headers: {
            ...headers,
            Authorization: `Bearer ${newToken.access_token}`,
          },
        });
      } else {
        console.log("ERREUR 1");
        throw error;
      }
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("ERREUR 2");
      console.error("Request failed:", error.response?.data || error.message);
    } else {
      console.log("ERREUR 3");
      console.error("Unexpected error:", error);
    }
    throw new Error("Request failed");
  }
}
