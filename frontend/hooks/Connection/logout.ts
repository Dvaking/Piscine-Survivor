import Cookie from "js-cookie";

export async function logout() {
  const refreshToken = Cookie.get("refreshToken");

  if (!refreshToken) {
    return false;
  }

  const response = await fetch("http://localhost:4000/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    console.error("Error during logout " + response.status);
    return false;
  }

  Cookie.remove("token");
  Cookie.remove("uuid");
  Cookie.remove("refreshToken");
  Cookie.remove("role");
  return true;
}
