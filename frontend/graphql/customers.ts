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

export const GetCustomersUnassigned = gql`
  query GetCustomersUnassigned {
    private_customers(where: { employee_uuid: { _is_null: true } }) {
      uuid
      name
      surname
    }
  }
`;

export const GetCustomersByUuid = gql`
  query GetCustomersByUuid($uuid: uuid) {
    private_customers(where: { uuid: { _eq: $uuid } }) {
      uuid
      name
      surname
      email
      image
      phone_number
    }
  }
`;

export const GetCustomersProfileByUuid = gql`
  query GetProfileCustomerInformationByUuid($uuid: uuid) {
    private_customers(where: { uuid: { _eq: $uuid } }) {
      uuid
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
      encounters {
        id
        source
        rating
        date
        comment
      }
      payments_history {
        amount
        comment
        date
        id
        payment_method
      }
    }
  }
`;

export const GetPaymentMethodByUuid = gql`
  query GetPaymentMethodByUuid($uuid: uuid) {
    private_payments_history(where: { customer_uuid: { _eq: $uuid } }) {
      payment_method
    }
  }
`;

export const GetCustomersName = gql`
  query GetCustomersName {
    private_customers {
      name
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

// UPDATE
export const UpdateCustomerEmployee = gql`
  mutation UpdateCustomerEmployee($uuid: uuid, $employee_uuid: uuid) {
    update_private_customers(
      where: { uuid: { _eq: $uuid } }
      _set: { employee_uuid: $employee_uuid }
    ) {
      affected_rows
    }
  }
`;
