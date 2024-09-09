import { gql } from "graphql-request";

//GET
export const GetEmployees = gql`
  query GetEmployees {
    private_employees {
      uuid
      id
      name
      surname
      email
      gender
      birth_date
      image
      work
      customer_asing {
        uuid
      }
    }
  }
`;

export const GetEmployeesByUuid = gql`
  query GetEmployeesByUuid($uuid: uuid) {
    private_employees(where: { uuid: { _eq: $uuid } }) {
      birth_date
      gender
      name
      surname
      id
      uuid
    }
  }
`;

export const GetEmployeesByWork = gql`
  query GetEmployeesByWork {
    private_employees(where: { work: { _ilike: "coach" } }) {
      name
      image
      email
      events {
        name
      }
      birth_date
      gender
      surname
      work
      uuid
    }
  }
`;

//UPDATE
export const UpdateEmployee = gql`
  mutation UpdateEmployee(
    $uuid: uuid
    $birth_date: String
    $email: String
    $gender: String
    $image: String
    $name: String
    $surname: String
    $work: String
  ) {
    update_private_employees(
      where: { uuid: { _eq: $uuid } }
      _set: {
        birth_date: $birth_date
        email: $email
        gender: $gender
        image: $image
        work: $work
        name: $name
        surname: $surname
      }
    ) {
      affected_rows
    }
  }
`;

// INSERT
export const InsertEmployee = gql`
  mutation MyMutation(
    $name: String
    $surname: String
    $gender: String
    $birth_date: String
    $email: String
    $work: String
    $id: Int
  ) {
    insert_private_employees(
      objects: {
        name: $name
        surname: $surname
        gender: $gender
        birth_date: $birth_date
        email: $email
        work: $work
        id: $id
      }
    ) {
      affected_rows
      returning {
        name
        surname
        gender
        birth_date
        email
        work
        id
        uuid
      }
    }
  }
`;
