import { gql } from "graphql-request";

// INSERT
export const InsertUser = gql`
  mutation InsertUser(
    $email: String
    $password: String
    $role: String
    $employee_uuid: uuid
    $customer_uuid: uuid
  ) {
    insert_users_one(
      object: {
        email: $email
        password: $password
        role: $role
        employee_uuid: $employee_uuid
        customer_uuid: $customer_uuid
      }
    ) {
      uuid
    }
  }
`;
