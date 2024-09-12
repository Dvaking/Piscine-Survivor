import { gql } from "graphql-request";

// GET
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
  mutation UpdateUser($email: String!, $password: String, $role: String) {
    update_users(
      where: { email: { _eq: $email } }
      _set: { email: $email, password: $password, role: $role }
    ) {
      affected_rows
      returning {
        email
      }
    }
  }
`;

export const UpdateUserPassword = gql`
  mutation UpdateUserPassword($password: String, $uuid: uuid) {
    update_users(
      where: { uuid: { _eq: $uuid } }
      _set: { password: $password }
    ) {
      affected_rows
    }
  }
}`;
