import { gql } from "graphql-request";

export const GetUserByEmail = gql`
  query GetUserByEmail($email: String) {
    users(where: { email: { _eq: $email } }) {
      email
      password
      role
      customer_uuid
      employee_uuid
    }
  }
`;
