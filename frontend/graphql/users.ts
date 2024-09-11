import { gql } from "graphql-request";

export const InsertUser = gql`
  mutation InsertUser(
    $customer_uuid: uuid
    $employee_uuid: uuid
    $password: String
    $role: String
    $email: String
  ) {
    insert_users(
      objects: {
        customer_uuid: $customer_uuid
        employee_uuid: $employee_uuid
        password: $password
        role: $role
        email: $email
      }
    ) {
      affected_rows
    }
  }
`;
