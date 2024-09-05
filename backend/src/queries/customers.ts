import { gql } from "graphql-request";

// GET
export const GetCustomersInformation = gql`
  query GetCustomersInformation {
    private_Customers {
      birth_date
      gender
      id
      name
      surname
    }
  }
`;

export const InsertCustomer = gql`
  mutation InsertCustomer(
    $id: Int
    $email: String
    $name: String
    $surname: String
    $birth_date: String
    $gender: String
    $description: String
    $astrological_sign: String
    $phone_number: String
    $address: String
  ) {
    insert_private_customers(
      objects: {
        gender: $gender
        name: $name
        surname: $surname
        id: $id
        birth_date: $birth_date
        email: $email
        description: $description
        astrological_sign: $astrological_sign
        phone_number: $phone_number
        address: $address
      }
    ) {
      affected_rows
    }
  }
`;

// UPDATE
export const UpdateCustomer = gql`
  mutation UpdateCustomer(
    $id: Int
    $email: String
    $name: String
    $surname: String
    $birth_date: String
    $gender: String
    $description: String
    $astrological_sign: String
    $phone_number: String
    $address: String
  ) {
    update_private_employees(
      where: { id: { _eq: $id } }
      _set: {
        gender: $gender
        name: $name
        surname: $surname
        id: $id
        birth_date: $birth_date
        email: $email
        description: $description
        astrological_sign: $astrological_sign
        phone_number: $phone_number
        address: $address
      }
    ) {
      affected_rows
    }
  }
`;
