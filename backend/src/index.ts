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
import { Token } from "./types/token";
import { insertEmployee, updateEmployee } from "./components/requestEmployees";
import { UpdateEmployee } from "./queries/employees";

async function putCustomersInDb(token: Token) {
  const customers = await getCustomers(token);

  customers.data.forEach(async (customer) => {
    const customerById = await getCustomerById(token, customer.id);
  });
}

async function putEmployeesInDb(token: Token) {
  const employees = await getEmployees(token);
  employees.data.forEach(async (employee) => {
    const employeeToSend = await getEmployeeById(token, employee.id);
    // const employeeImage = await getEmployeeImageById(token, employee.id);

    insertEmployee(employeeToSend.data, "Hello");
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

async function updateEmployeesInDb(token: Token) {
  const employees = await getEmployees(token);

  employees.data.forEach(async (employee) => {
    const employeeById = await getEmployeeById(token, employee.id);
    // const employeeImage = await getEmployeeImageById(token, employee.id);

    updateEmployee(employeeById.data, "Hello");
  });
}

async function updateData(): Promise<void> {
  try {
    const token = await login();

    updateEmployeesInDb(token);
  } catch (error) {
    console.error("An error occurred while updating data:", error);
  }
}

function executeQuery() {
  fetchData();
  cron.schedule("*/5 * * * *", () => {
    updateData();
    console.log("-----------------------------------");
});
}

executeQuery();


