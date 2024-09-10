import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { GetUserByEmail, Client } from "../queries/";
import express from "express";


const authRouter = express.Router();
const secretKey = process.env.JWT_SECRET_KEY;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

authRouter.use(bodyParser.json());

let refreshTokens: { [key: string]: string } = {};

type InterfaceUser = {
  users: User[];
};

type User = {
  email: string;
  password: string;
  role: string;
  customer_uuid: string;
  employee_uuid: string;
};

async function getUserByEmail(email: string): Promise<{
  role: string;
  employee_uuid: string;
  customer_uuid: string;
  password: string;
}> {
  let response: InterfaceUser | undefined = undefined;
  let returnedUser = {
    role: "NoUser",
    employee_uuid: "",
    customer_uuid: "",
    password: "",
  };
  try {
    response = await Client.request(GetUserByEmail, { email: email });
    if (!response) return returnedUser;
    returnedUser.customer_uuid = response.users[0].customer_uuid;
    returnedUser.employee_uuid = response.users[0].employee_uuid;
    returnedUser.role = response.users[0].role;
    returnedUser.password = response.users[0].password;
    return returnedUser;
  } catch (error) {
    console.error("Lors du get du User");
    return returnedUser;
  }
}

function verifyUser(
  user: {
    role: string;
    employee_uuid: string;
    customer_uuid: string;
    password: string;
  },
  password: string
) {
  let returnedUser = {
    role: "NoUser",
    uuid: "",
  };

  if (user.role === "NoUser" || user.password !== password) {
    return returnedUser;
  }

  if (user.role === "customer") {
    returnedUser.role = "customer";
    returnedUser.uuid = user.customer_uuid;
  } else if (user.role.toLowerCase() === "coach") {
    returnedUser.role = "coach";
    returnedUser.uuid = user.employee_uuid;
  } else if (user.role.toLowerCase() === "admin") {
    returnedUser.role = "admin";
    returnedUser.uuid = user.employee_uuid;
  } else {
    returnedUser.role = "manager";
    returnedUser.uuid = user.employee_uuid;
  }

  return returnedUser;
}

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    const verifiedUser = verifyUser(user, password);

    if (verifiedUser.role === "NoUser") {
      return res
        .status(401)
        .json({ message: "Nom d’utilisateur ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      {
        sub: email,
        "https://hasura.io/jwt/claims": {
          "x-hasura-default-role": verifiedUser.role,
          "x-hasura-allowed-roles": [verifiedUser.role],
          "x-hasura-user-id": verifiedUser.uuid,
        },
      },
      secretKey as string,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { sub: email },
      refreshTokenSecret as string,
      { expiresIn: "7d" }
    );

    refreshTokens[email] = refreshToken;

    res.json({ token, refreshToken, role: verifiedUser.role, uuid: verifiedUser.uuid});
  } catch (error) {
    console.error("Error during login process:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

authRouter.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(
    refreshToken,
    refreshTokenSecret as string,
    async (err: any, user: any) => {
      if (err || !refreshTokens[user.sub]) return res.sendStatus(403);

      const userDetails: {
        role: string;
        employee_uuid: string;
        customer_uuid: string;
        password: string;
      } = await getUserByEmail(user.sub);
      const verifiedUser: {
        role: string;
        uuid: string;
      } = verifyUser(userDetails, userDetails.password);
      if (verifiedUser.role === "NoUser") return res.sendStatus(403);

      interface Claims {
        "x-hasura-default-role": string;
        "x-hasura-allowed-roles": string[];
        "x-hasura-user-id": string;
      }

      const token = jwt.sign(
        {
          sub: user.sub,
          "https://hasura.io/jwt/claims": {
            "x-hasura-default-role": verifiedUser.role,
            "x-hasura-allowed-roles": [verifiedUser.role],
            "x-hasura-user-id": verifiedUser.uuid,
          } as Claims,
        },
        secretKey as string,
        { expiresIn: "1h" }
      );
      res.json({ token });
    }
  );
});

export default authRouter;
