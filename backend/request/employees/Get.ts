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
  query MyQuery {
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