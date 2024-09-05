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
import { Token } from "@types";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { GraphQLClient } from "graphql-request";

interface Employee {
  private_employees: InsertEmployeeProps[];
}

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

export const client = new GraphQLClient("http://localhost:8080/v1/graphql", {
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  } as HeadersInit,
});

export type InsertEmployeeProps = {
  gender: string;
  name: string;
  surname: string;
  id: number;
  birth_date: string;
};

const variables: InsertEmployeeProps = {
  gender: "M",
  name: "John",
  surname: "Doe",
  id: 10,
  birth_date: "1990-01-01",
};

export async function insertEmployee(employees: InsertEmployeeProps) {
  let response: Employee | undefined = undefined;
  try {
    response = await client.request(InsertEmployee, employees);
    console.log("Utilisateur inséré avec succès:", response);
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_employees : [];
}

async function sendDataToDatabase(variables: any) {
  try {
    console.log("Sending data to database...");

    insertEmployee(variables);
  } catch (error) {
    console.error("Error sending data:", error);
  }
}

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
  const employee = await getEmployeeById(token, 1);

  sendDataToDatabase(variables);

  // employees.data.forEach(async (employee: Employee) => {
  //   const employeeById = await getEmployeeById(token, employee.id);
  //   const employeeImage = await getEmployeeImageById(token, employee.id);
  // });
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
});
