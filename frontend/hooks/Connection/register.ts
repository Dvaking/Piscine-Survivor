import Cookie from "js-cookie";

export async function registerUser(
  email: string,
  password: string,
  role: string,
  uuid: string
) {
  const response = await fetch("http://localhost:4000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, uuid, role }),
  });

  if (!response.ok) {
    return false;
  }
  return true;
}
