import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import "dotenv/config";
import express from "express";
import { getUserByEmail } from "./getUserByEmail";
import { verifyUser } from "./verifyUser";
import { hashPassword } from "./passwordHash";

const authRouter = express.Router();
const secretKey = process.env.JWT_SECRET_KEY;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
let refreshTokens: { [key: string]: string } = {};

authRouter.use(bodyParser.json());

authRouter.post("/logout", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    console.error("No refresh token provided");
    return res.sendStatus(400);
  }

  jwt.verify(
    refreshToken,
    refreshTokenSecret as string,
    (err: Error | null, user: any) => {
      if (err) {
        console.error("Token verification failed:", err.message);
        return res.sendStatus(403);
      }

      if (!refreshTokens) {
        console.error("No token found in store for user");
        return res.sendStatus(403);
      }

      delete refreshTokens[user.sub];
      console.log("User successfully logged out");
      res.sendStatus(204);
    }
  );
});

authRouter.post("/register", async (req, res) => {
  const { uuid, password } = req.body;

  if (!password || !uuid) {
    console.error("password not provided");
    return res.sendStatus(400);
  }

  const hashedPassword = await hashPassword(password);
  if (!hashedPassword) {
    console.error("Error hashing password");
    return res.sendStatus(500);
  }

});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("email", email);
  console.log("password", password);

  try {
    const user = await getUserByEmail(email);
    const userDetails = {
      role: user.role,
      employee_uuid: user.employee_uuid,
      customer_uuid: user.customer_uuid,
      password: user.password,
    };
    const verifiedUser = verifyUser({ user: userDetails, password: password });

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

    res.json({
      token,
      refreshToken,
      role: verifiedUser.role,
      uuid: verifiedUser.uuid,
    });
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
      } = verifyUser({ user: userDetails, password: userDetails.password });
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
