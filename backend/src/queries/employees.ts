import { gql } from 'graphql';
//GET
export const GetEmployeesInformation = gql`
  query GetEmployeesInformation {
    private_employees {
      birth_date
      gender
      id
      name
      surname
    }
  }
`;


