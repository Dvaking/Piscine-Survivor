import * as cron from "node-cron";
import { login } from "./authApi";
import { getEmployees } from "./employeesApi";
import { getCustomers } from "./customersApi";
import { Token } from "../types/token";

async function fetchData(): Promise<void> {
  try {
    const token = await login();

    const employees = await getEmployees(token);
    const customers = await getCustomers(token);
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
}

cron.schedule("0 * * * *", () => {
  console.log("Running the job every hour");
  fetchData();
});

fetchData();
