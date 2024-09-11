import { gql } from "graphql-request";

export const GetEncounters = gql`
  query GetEncounters {
    private_encounters {
      source
    }
  }
`;
