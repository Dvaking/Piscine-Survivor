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
import { Token, InsertEmployeeProps } from "@types";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { GraphQLClient } from "graphql-request";
import "dotenv/config";

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
    "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  } as HeadersInit,
});

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

  employees.data.forEach(async (employee) => {
    const employeeToSend = {
      id: employee.id,
      name: employee.name,
      surname: employee.surname,
      birth_date: employee.birth_date,
      gender: employee.gender,
      work: employee.work,
    };
    insertEmployee(employeeToSend);
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

cron.schedule("*/10 * * * * *", () => {
  fetchData();
  console.log("-----------------------------------");
});
