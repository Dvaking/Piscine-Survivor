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
    }
  }
`;

export const GetEmployeeTableInformation = gql`
  query GetEmployeeTableInformation {
    private_employees {
      id
      email
      name
      surname
      uuid
      work
      image
      customer_assign_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const HowManyEmployees = gql`
  query HowManyEmployees {
    private_employees_aggregate {
      aggregate {
        count
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

export const GetEmployeesAssignedCustomers = gql`
  query GetEmployeesAssignedCustomers {
    private_employees(where: { work: { _eq: "Coach" } }) {
      name
      customer_assign {
        name
      }
    }
  }
`;

export const GetEmployeesNameByWork = gql`
  query GetEmployeesNameByWork {
    private_employees(where: { work: { _eq: "Coach" } }) {
      name
      customer_asing {
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
    $name: String
    $surname: String
    $gender: String
    $birth_date: String
    $email: String
    $work: String
  ) {
    insert_private_employees(
      objects: {
        name: $name
        surname: $surname
        gender: $gender
        birth_date: $birth_date
        email: $email
        work: $work
      }
    ) {
      affected_rows
      returning {
        email
        work
        uuid
      }
    }
  }
`;

export const GetCoachNameByUuid = gql`
  query GetCoachNameByUuid($uuid: uuid) {
    private_employees(where: { uuid: { _eq: $uuid } }) {
      name
      surname
    }
  }
`;
