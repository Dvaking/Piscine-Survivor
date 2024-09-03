import { gql } from "graphql-request";

export const getCustomers = gql`
  query getCustomers {
    private_customers {
      id
      name
      surname
      customer_auth {
        email
      }
    }
  }
`;

export const getCustomer = gql`
  query getCustomer($uuid: uuid!) {
    private_customers(where: { uuid: { _eq: $uuid } }) {
      birth_date
      astrological_sign
      id
      name
      surname
      customer_auth {
        email
      }
      gender
      description
    }
  }
`;

export const getPaymentsHistory = gql`
  query getPaymentsHistory($uuid: uuid!) {
    private_customers(
      where: {
        uuid: { _eq: $uuid }
        _and: { payments_history: { customer__uuid: { _eq: $uuid } } }
      }
    )
  }
`;
