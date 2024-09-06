import { gql } from "graphql-request";

//GET
export const GetCustomersInformation = gql`
  query GetCustomersInformation {
    private_customers {
      id
      name
      surname
      astrological_sign
    }
  }
`;

export const GetCustomersInformationByUuid = gql`
  query GetCustomersInformationByUuid($uuid: uuid) {
    private_customers(where: { uuid: { _eq: $uuid } }) {
      id
      name
      surname
      astrological_sign
      uuid
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
