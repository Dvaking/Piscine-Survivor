import { gql } from "graphql-request";

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

//UPDATE

// INSERT
export const InsertEmployee = gql`
  mutation MyMutation(
    $gender: String
    $name: String
    $surname: String
    $id: Int
    $birth_date: String
  ) {
    insert_private_employees(
      objects: {
        gender: $gender
        name: $name
        surname: $surname
        id: $id
        birth_date: $birth_date
      }
    ) {
      affected_rows
      returning {
        surname
        name
        gender
        birth_date
        id
        uuid
      }
    }
  }
`;
