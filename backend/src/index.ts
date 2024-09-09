import * as cron from "node-cron";
import { login } from "./API/authApi";
import {
  getEmployees,
  getEmployeeById,
  getEmployeeImageById,
} from "./API/employeesApi";
import {
  getCustomers,
  getCustomerById,
  getCustomerImageById,
  getClothes,
} from "./API/customersApi";
import { getClotheImage } from "./API/clothesApi";
import { Token } from "./types/token";
import {
  insertEmployee,
  updateEmployee,
  insertCustomer,
  updateCustomer,
  insertClothe,
} from "./components/";
import { UpdateEmployee } from "./queries/employees";
import { ClotheProps } from "@types";

async function putCustomersInDb(token: Token) {
  const customers = await getCustomers(token);

  customers.data.forEach(async (customer) => {
    try {
      const customerById = await getCustomerById(token, customer.id);
      const customerImage = await getCustomerImageById(token, customer.id);

      const clothes = await getClothes(token, customer.id);

      for (const element of clothes.data) {
        const clotheImage = await getClotheImage(token, element.id);
        const dataToSend = {
          ...element,
          customer_id: customerById.data.id,
        };
        insertClothe(dataToSend, clotheImage.data);
      }

      insertCustomer(customerById.data, customerImage.data);
    } catch (error) {
      console.error("An error occurred while inserting customers");
    }
  });
}

async function putEmployeesInDb(token: Token) {
  const employees = await getEmployees(token);
  employees.data.forEach(async (employee) => {
    try {
      const employeeToSend = await getEmployeeById(token, employee.id);
      const employeeImage = await getEmployeeImageById(token, employee.id);

      insertEmployee(employeeToSend.data, employeeImage.data);
    } catch (error) {
      console.error("An error occurred while inserting employees");
    }
  });
}

async function updateEmployeesInDb(token: Token) {
  const employees = await getEmployees(token);

  employees.data.forEach(async (employee) => {
    const employeeById = await getEmployeeById(token, employee.id);
    const employeeImage = await getEmployeeImageById(token, employee.id);

    updateEmployee(employeeById.data, employeeImage.data);
  });
}

async function updateCustomersInDb(token: Token) {
  const customers = await getCustomers(token);

  customers.data.forEach(async (customer) => {
    const customerById = await getCustomerById(token, customer.id);
    const customerImage = await getCustomerImageById(token, customer.id);

    updateCustomer(customerById.data, customerImage.data);
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

async function updateData(): Promise<void> {
  try {
    const token = await login();

    updateEmployeesInDb(token);
    updateCustomersInDb(token);
  } catch (error) {
    console.error("An error occurred while updating data:", error);
  }
}

function executeQuery() {
  fetchData();
  cron.schedule("*/5 * * * *", () => {
    updateData();
  });
}

executeQuery();
