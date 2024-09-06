import { gql } from "graphql-request";

//GET
export const AuthUser = gql`
  query AuthUser($email: String, $password: String) {
    users(where: { email: { _eq: $email }, password: { _eq: $password } }) {
      role
      customer_uuid
      employee_uuid
    }
  }
`;
