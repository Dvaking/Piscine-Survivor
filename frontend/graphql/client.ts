import { GraphQLClient } from "graphql-request";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const client = new GraphQLClient("http://localhost:8080/v1/graphql", {
  headers: {
    "Authorization": `Bearer ${token}`,
  },
});
