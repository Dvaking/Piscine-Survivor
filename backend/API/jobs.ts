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
  getCustomerImageById,
  getClothes,
} from "./customersApi";
import {
  getEncounters,
  getEncounterByCustomerId,
  getEncounterById,
} from "./encountersApi";
import { getTips } from "./tipsApi";
import { getEvents, getEventById } from "./eventsApi";
import { getClotheImage } from "./clothesApi";

async function fetchData(): Promise<void> {
  try {
    const token = await login();

    const employees = await getEmployees(token);
    // put all employees in the database
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
}

cron.schedule("0 * * * *", () => {
  fetchData();
});

fetchData();
