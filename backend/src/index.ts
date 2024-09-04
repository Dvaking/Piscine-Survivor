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

async function putCustomersInDb(token: Token) {
  const customers = await getCustomers(token);

  customers.data.forEach(async (customer) => {
    const customerById = await getCustomerById(token, customer.id);
    const paymentsHistory = await getPaymentsHistory(token, customer.id);
    const customerImage = await getCustomerImageById(token, customer.id);
    const clothes = await getClothes(token, customer.id);
    const encounters = await getEncounterByCustomerId(token, customer.id);
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
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
}

cron.schedule("0 * * * *", () => {
  fetchData();
});

fetchData();
