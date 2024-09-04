import * as cron from "node-cron";
import * as fs from "fs";
import * as path from "path";
import { login } from "./authApi";
import {
  getEmployees,
  getEmployeeById,
  getEmployeeImageById,
  getEmployeeMe,
} from "./employeesApi";
import {
  getCustomers,
  getCustomerById,
  getPaymentsHistory,
} from "./customersApi";
import { Token } from "../types/token";

async function fetchData(): Promise<void> {
  try {
    const token = await login();

    const employees = await getEmployees(token);
    const customers = await getCustomers(token);
    const customer = await getCustomerById(token, 1);
    const employee = await getEmployeeById(token, 1);
    const employeeMe = await getEmployeeMe(token);
    const employeeImage = await getEmployeeImageById(token, 1);
    const paymentsHistory = await getPaymentsHistory(token, 1);

    console.log("paymentsHistory", paymentsHistory.data);
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
}

cron.schedule("0 * * * *", () => {
  fetchData();
});

fetchData();
