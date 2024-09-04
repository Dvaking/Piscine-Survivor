import * as cron from "node-cron";
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
import {
  getEncounters,
  getEncounterByCustomerId,
  getEncounterById,
} from "./encountersApi";
import { getEventById, getEvents } from "./tipsApi";

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
    const encounters = await getEncounters(token);
    const encounter = await getEncounterById(token, 1);
    const encounterByCustomerId = await getEncounterByCustomerId(token, 1);
    const events = await getEvents(token);
    const event = await getEventById(token, 1);

  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
}

cron.schedule("0 * * * *", () => {
  fetchData();
});

fetchData();
