import { gql } from "graphql-request";

export const GetClothesByCustomerEmail = gql`
  query GetClothesByCustomerEmail($email: String) {
    private_customers(where: { email: { _eq: $email } }) {
      clothes {
        image
        type
        id
      }
    }
  }
`;
