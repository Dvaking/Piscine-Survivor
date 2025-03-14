import Cookies from "js-cookie";

export async function refreshToken() {
  const refreshToken = Cookies.get("refreshToken");
  const response = await fetch("http://localhost:4000/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  Cookies.set("token", data.token);
  return true;
}