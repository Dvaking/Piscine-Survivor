import { GraphQLClient } from "graphql-request";
import 'dotenv/config';

export const Client = new GraphQLClient(process.env.CLIENT_URL as string, {
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    } as HeadersInit,
  });