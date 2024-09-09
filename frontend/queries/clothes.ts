import { gql } from "graphql-request";

export const GetClothesByCustomerEMail = gql`
  query GetClothesByCustomerEMail($email: String) {
    private_customers(where: { email: { _eq: $email } }) {
      clothes {
        id
        image
        type
        id
      }
    }
  }
`;
