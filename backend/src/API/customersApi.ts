import axios, { AxiosResponse } from "axios";
import { login } from "./authApi";
import { Token, CustomerProps } from "../types/";

const url = "https://soul-connection.fr/api/customers";
const headers = {
  accept: "application/json",
  "X-Group-Authorization": "e6e70c63639f039518f84a0f3c517837",
};

export async function getCustomers(
  token: Token
): Promise<AxiosResponse<CustomerProps[]>> {
  try {
    let response: AxiosResponse<CustomerProps[]>;

    try {
      response = await axios.get<CustomerProps[]>(url, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token.access_token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        let newToken = await login();
        response = await axios.get<CustomerProps[]>(url, {
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

export async function getCustomerById(
  token: Token,
  id: number
): Promise<AxiosResponse<CustomerProps>> {
  const newUrl = `https://soul-connection.fr/api/customers/${id}`;
  try {
    let response: AxiosResponse<CustomerProps>;

    try {
      response = await axios.get<CustomerProps>(newUrl, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token.access_token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        let newToken = await login();
        response = await axios.get<CustomerProps>(newUrl, {
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

export async function getCustomerImageById(
  token: Token,
  id: number
): Promise<string> {
  const newUrl = `https://soul-connection.fr/api/customers/${id}/image`;
  try {
    let response: AxiosResponse<any>;

    try {
      response = await axios.get(newUrl, {
        responseType: "arraybuffer",
        headers: {
          ...headers,
          Authorization: `Bearer ${token.access_token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        let newToken = await login();
        response = await axios.get(newUrl, {
          responseType: "arraybuffer",
          headers: {
            ...headers,
            Authorization: `Bearer ${newToken.access_token}`,
          },
        });
      } else {
        console.error("Request failed");
        return "";
      }
    }

    return Buffer.from(response.data).toString("base64");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Request failed:", error.message);
    } else {
      console.error("Unexpected error:");
    }
    return "";
  }
}

export async function getPaymentsHistory(
  token: Token,
  id: number
): Promise<AxiosResponse<any>> {
  const newUrl = `https://soul-connection.fr/api/customers/${id}/payments_history`;
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
      console.error("Unexpected error:", error);
    }
    throw new Error("Request failed");
  }
}

export async function getClothes(
  token: Token,
  id: number
): Promise<AxiosResponse<any>> {
  const newUrl = `https://soul-connection.fr/api/customers/${id}/clothes`;
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
      console.error("Unexpected error:", error);
    }
    throw new Error("Request failed");
  }
}
