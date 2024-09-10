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
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  localStorage.setItem("user", data.uuid);
  return true;
}
