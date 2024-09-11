import { gql } from "graphql-request";

// GET
export const GetEvents = gql`
query GetEvents {
  private_events {
    name
    date
    location_name
    location_x
    location_y
    max_participants
    type
    id
  }
}
`;
