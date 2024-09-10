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
  getPaymentsHistory,
} from "./API/customersApi";
import { getClotheImage } from "./API/clothesApi";
import { Token } from "./types/token";
import {
  insertEmployee,
  updateEmployee,
  insertCustomer,
  updateCustomer,
  insertClothe,
  insertPaymentHistory,
  insertTip,
  insertEvent,
} from "./components/";
import { getTips } from "./API/tipsApi";
import { getEventById, getEvents } from "./API/eventsApi";
import fs from "fs";
import { get } from "http";

async function putCustomersInDb(token: Token) {
  const customers = await getCustomers(token);

  customers.data.forEach(async (customer) => {
    try {
      const customerById = await getCustomerById(token, customer.id);
      const customerImage = await getCustomerImageById(token, customer.id);
      const payments = await getPaymentsHistory(token, customer.id);
      const clothes = await getClothes(token, customer.id);

      for (const element of clothes.data) {
        const base64Image = await getClotheImage(token, element.id);
        const dataToSend = {
          ...element,
          customer_id: customerById.data.id,
        };

        insertClothe(dataToSend, base64Image);
      }

      const customer_uuid = await insertCustomer(
        customerById.data,
        customerImage
      );
      if (!customer_uuid) {
        return;
      }
      for (const element of payments.data) {
        insertPaymentHistory(element, customer_uuid);
      }
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

      insertEmployee(employeeToSend.data, employeeImage);
    } catch (error) {
      console.error("An error occurred while inserting employees");
    }
  });
}

async function putTipsInDb(token: Token) {
  const tips = await getTips(token);

  tips.data.forEach(async (tip: any) => {
    try {
      insertTip(tip);
    } catch (error) {
      console.error("An error occurred while inserting tips");
    }
  });
}

async function putEventsInDb(token: Token) {
  const events = await getEvents(token);

  events.data.forEach(async (event: any) => {
    try {
      const eventDetailed = await getEventById(token, event.id);
      insertEvent(eventDetailed.data);
    } catch (error) {
      console.error("An error occurred while inserting events");
    }
  });
}

async function updateEmployeesInDb(token: Token) {
  const employees = await getEmployees(token);

  employees.data.forEach(async (employee) => {
    const employeeById = await getEmployeeById(token, employee.id);
    const employeeImage = await getEmployeeImageById(token, employee.id);

    updateEmployee(employeeById.data, employeeImage);
  });
}

async function updateCustomersInDb(token: Token) {
  const customers = await getCustomers(token);

  customers.data.forEach(async (customer) => {
    const customerById = await getCustomerById(token, customer.id);
    const customerImage = await getCustomerImageById(token, customer.id);

    updateCustomer(customerById.data, customerImage);
  });
}

async function fetchData(): Promise<void> {
  try {
    const token = await login();

    // putEmployeesInDb(token);
    // putCustomersInDb(token);
    // putTipsInDb(token);
    putEventsInDb(token);
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
  console.log("Data fetched successfully");
  cron.schedule("*/30 * * * *", () => {
    updateData();
    console.log("Data updated successfully");
  });
}

executeQuery();
