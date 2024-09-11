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

// UPDATE

export const UpdateUser = gql`
  mutation UpdateUser(
    $email: String!
    $password: String
    $role: String
    $employee_uuid: uuid
    $customer_uuid: uuid
  ) {
    update_users(
      where: { email: { _eq: $email } }
      _set: {
        email: $email
        password: $password
        role: $role
        employee_uuid: $employee_uuid
        customer_uuid: $customer_uuid
      }
    ) {
      affected_rows
    }
  }
`;
