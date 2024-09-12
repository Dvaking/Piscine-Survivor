import { gql } from "graphql-request";

export const GetEvents = gql`
  query GetEvents {
    private_events {
      name
      type
      date
      duration
    }
  }
`;