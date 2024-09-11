import Cookie from "js-cookie";

export async function login(email: string, password: string) {
  const response = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  Cookie.set("token", data.token);
  Cookie.set("uuid", data.uuid);
  Cookie.set("refreshToken", data.refreshToken);
  Cookie.set("role", data.role);
  return true;
}
