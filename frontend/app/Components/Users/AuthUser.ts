import { client, AuthUser } from "@queries"
import { UserAuthProps } from "@types";

interface LoginProps {
  users: UserAuthProps[]
}

async function login(email: string, password: string) {
  let data: LoginProps = { users: [] };
  try {
    data = await client.request(AuthUser, { email, password });
  } catch (error) {
    console.error(error);
  }
  if (data.users.length === 0)
    return "not user found";
  else if (data.users[0].role === "customer")
    return data.users[0].customer_uuid;
  else
    return data.users[0].employee_uuid;
}