import { gql } from "graphql-request";

export const getUsersGlobalInfomation = gql`
  query {
    employees {
      id
      name
    }
  }
`;

export const getEmployees = gql`
  query {
    users {
      employee_link {
        work
        uuid
      }
      name
      email
      surname
    }
  }
`;
