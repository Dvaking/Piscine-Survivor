import { GraphQLClient } from "graphql-request";


export const client = new GraphQLClient("http://localhost:8080/v1/graphql", {
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  } as HeadersInit,
});
