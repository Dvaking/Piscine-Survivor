import axios, { Axios, AxiosResponse } from "axios";
import { Token } from "@types";

const url = "https://soul-connection.fr/api/employees/login";
const headers = {
  accept: "application/json",
  "X-Group-Authorization": "e6e70c63639f039518f84a0f3c517837",
  "Content-Type": "application/json",
};

const data = {
  email: "jeanne.martin@soul-connection.fr",
  password: "naouLeA82oeirn",
};


export async function login(): Promise<Token> {
  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios specific error handling
      console.error("Axios Error:", error.response?.data || error.message);
      throw new Error(error.response?.data || error.message);
    } else {
      // Generic error handling
      console.error("Error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}
