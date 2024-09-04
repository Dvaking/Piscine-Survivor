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
import { getEventById, getEvents, getClotheImage } from "./tipsApi";

async function fetchData(): Promise<void> {
  try {
    const token = await login();

  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
}

cron.schedule("0 * * * *", () => {
  fetchData();
});

fetchData();
