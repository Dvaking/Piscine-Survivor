import { gql } from "graphql-request";

//GET
export const GetCustomers = gql`
  query GetCustomers {
    private_customers {
      uuid
      id
      name
      surname
      astrological_sign
      birth_date
      description
      email
      employee_uuid
      gender
      image
      phone_number
      address
    }
  }
`;

export const GetCustomersByUuid = gql`
  query GetCustomersByUuid($uuid: uuid) {
    private_customers(where: { uuid: { _eq: $uuid } }) {
      id
      name
      surname
      astrological_sign
      birth_date
      description
      email
      employee_uuid
      gender
      image
      phone_number
      address
    }
  }
`;

// INSERT
export const InsertCustomer = gql`
  mutation MyMutation(
    $id: Int
    $name: String
    $surname: String
    $astrological_sign: String
  ) {
    insert_private_customers(
      objects: {
        id: $id
        name: $name
        surname: $surname
        astrological_sign: $astrological_sign
      }
    ) {
      affected_rows
      returning {
        id
        name
        surname
        astrological_sign
        uuid
      }
    }
  }
`;

