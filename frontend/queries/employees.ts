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

export const GetEmployeesInformationByUuid = gql`
  query GetEmployeesInformationByUuid($uuid: uuid) {
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

export const GetEmployeesInformationByWork = gql`
  query MyQuery {
    private_employees(where: { work: { _ilike: "coach" } }) {
      name
      image
      email
      events {
        name
      }
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
