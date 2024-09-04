import { GraphQLClient } from 'graphql-request';
import 'dotenv/config'

console.log(process.env.HASURA_HTTP);

export const client = new GraphQLClient("http://localhost:8080/v1/graphql", {
  headers: {
    "x-hasura-admin-secret": "azerty",
  } as HeadersInit,
});
