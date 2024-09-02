import { gql } from "graphql-request";

export const getUsersGlobalInfomation = gql`
  query {
    employees {
      id
      name
    }
  }
`;