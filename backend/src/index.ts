import * as cron from "node-cron";
import { login } from "./API/authApi";
import {
  getEmployees,
  getEmployeeById,
  getEmployeeImageById,
  getEmployeeMe,
} from "./API/employeesApi";
import {
  getCustomers,
  getCustomerById,
  getPaymentsHistory,
  getCustomerImageById,
  getClothes,
} from "./API/customersApi";
import {
  getEncounters,
  getEncounterByCustomerId,
  getEncounterById,
} from "./API/encountersApi";
import { getTips } from "./API/tipsApi";
import { getEvents, getEventById } from "./API/eventsApi";
import { getClotheImage } from "./API/clothesApi";
import { Token, Employee } from "@types";
import { gql } from "graphql-request";

const { request } = require("graphql-request");

const graphqlURL = "http://localhost:8080/v1/graphql"; // Remplacez par votre URL Hasura

const mutation = `
  mutation AddEmployee($gender: String, $id: Int, $name: String, $surname: String, $birth_date: String, $work: String) {
    insert_private_employees(objects: {birth_date: $birth_date, id: $id, gender: $gender, name: $name, surname: $surname, work: $work}) {
    returning {
      uuid
    }
  }
`;

const variables = {
  gender: "M",
  id: 10,
  name: "John",
  surname: "Doe",
  birth_date: "1990-01-01",
  work: "Manager",
};

async function putCustomersInDb(token: Token) {
  const customers = await getCustomers(token);

  customers.data.forEach(async (customer) => {
    const customerById = await getCustomerById(token, customer.id);
    // const paymentsHistory = await getPaymentsHistory(token, customer.id);
    // const customerImage = await getCustomerImageById(token, customer.id);
    // const clothes = await getClothes(token, customer.id);
    // const encounters = await getEncounterByCustomerId(token, customer.id);
  });
}

async function putEmployeesInDb(token: Token) {
  const employees = await getEmployees(token);

  employees.data.forEach(async (employee: Employee) => {
    const employeeById = await getEmployeeById(token, employee.id);
    const employeeImage = await getEmployeeImageById(token, employee.id);
  });
}

async function fetchData(): Promise<void> {
  try {
    const token = await login();

    putEmployeesInDb(token);
    putCustomersInDb(token);
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
}

cron.schedule("* * * * * *", () => {
  fetchData();
  console.log("-----------------------------------");
  request(graphqlURL, mutation, variables)
    .then((data: any) => console.log(data))
    .catch((error: any) => console.error(error));
});
