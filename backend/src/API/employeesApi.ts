import axios, { AxiosResponse } from "axios";
import { login } from "./authApi";
import { EmployeeProps, Token } from "../types/";

const url = "https://soul-connection.fr/api/employees";
const headers = {
  accept: "application/json",
  "X-Group-Authorization": "e6e70c63639f039518f84a0f3c517837",
};

export async function getEmployees(
  token: Token
): Promise<AxiosResponse<EmployeeProps[]>> {
  try {
    let response: AxiosResponse<EmployeeProps[]>;
    try {
      response = await axios.get<EmployeeProps[]>(url, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token.access_token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        let newToken = await login();
        response = await axios.get<EmployeeProps[]>(url, {
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
      console.error("Unexpected error:", error);
    }
    throw new Error("Request failed");
  }
}

export async function getEmployeeById(
  token: Token,
  id: number
): Promise<AxiosResponse<EmployeeProps>> {
  const newUrl = `https://soul-connection.fr/api/employees/${id}`;
  try {
    let response: AxiosResponse<EmployeeProps>;

    try {
      response = await axios.get<EmployeeProps>(newUrl, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token.access_token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        let newToken = await login();
        response = await axios.get<EmployeeProps>(newUrl, {
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
      console.error("Unexpected error:", error);
    }
    throw new Error("Request failed");
  }
}

export async function getEmployeeMe(
  token: Token
): Promise<AxiosResponse<EmployeeProps>> {
  const newUrl = `https://soul-connection.fr/api/employees/me`;
  try {
    let response: AxiosResponse<EmployeeProps>;

    try {
      response = await axios.get<EmployeeProps>(newUrl, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token.access_token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        let newToken = await login();
        response = await axios.get<EmployeeProps>(newUrl, {
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
      console.error("Unexpected error:", error);
    }
    throw new Error("Request failed");
  }
}

export async function getEmployeeImageById(
  token: Token,
  id: number
): Promise<AxiosResponse<string>> {
  const newUrl = `https://soul-connection.fr/api/employees/${id}/image`;
  let response: AxiosResponse<string>;

  try {
    response = await axios.get(newUrl, {
      headers: {
        ...headers,
        Authorization: `Bearer ${token.access_token}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // Gérer l'erreur 401 Unauthorized (e.g., rafraîchir le token)
        let newToken = await login();
        response = await axios.get(newUrl, {
          headers: {
            ...headers,
            Authorization: `Bearer ${newToken.access_token}`,
          },
        });
      } else if (error.response?.status === 404) {
        // Gérer l'erreur 404 en retournant une chaîne vide
        response = {
          data: "", // Retourne une chaîne vide en cas de 404
          status: 404,
          statusText: "Not Found",
          headers: {}, // Ajoute des headers vides
          config: {}, // Ajoute une config vide
        } as AxiosResponse<string>;
      } else {
        // Gérer les autres erreurs
        throw error; // Rejette l'erreur pour un traitement ailleurs
      }
    } else {
      // Gérer les erreurs non Axios (exceptions)
      throw error;
    }
  }

  return response;
}
