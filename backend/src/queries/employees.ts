import { gql } from "graphql-request";

//GET
export const GetEmployees = gql`
  query GetEmployees {
    private_employees {
      birth_date
      gender
      id
      name
      surname
    }
  }
`;

// GET
export const GetEmployeeUuidById = gql`
  query GetEmployeeUuidById($id: Int) {
    private_employees(where: { id: { _eq: $id } }) {
      uuid
    }
  }
`;

// INSERT
export const InsertEmployee = gql`
  mutation InsertEmployee(
    $id: Int
    $email: String
    $name: String
    $surname: String
    $birth_date: String
    $gender: String
    $work: String
    $image: String
  ) {
    insert_private_employees(
      objects: {
        gender: $gender
        name: $name
        surname: $surname
        id: $id
        birth_date: $birth_date
        image: $image
        email: $email
        work: $work
      }
      on_conflict: {
        constraint: employees_pkey
        update_columns: [email, name, surname, birth_date, gender, work, image]
      }
    ) {
      affected_rows
      returning {
        uuid
      }
    }
  }
`;

// UPDATE
export const UpdateEmployee = gql`
  mutation UpdateEmployee(
    $id: Int
    $email: String
    $name: String
    $surname: String
    $birth_date: String
    $gender: String
    $work: String
    $image: String
  ) {
    update_private_employees(
      where: { id: { _eq: $id } }
      _set: {
        id: $id
        birth_date: $birth_date
        email: $email
        gender: $gender
        name: $name
        surname: $surname
        work: $work
        image: $image
      }
    ) {
      affected_rows
    }
  }
`;
