import { gql } from "graphql-request";

export const getUsersGlobalInfomation = gql`
  query {
    users {
      name
      email
    }
  }
`;