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
  insertEncounter,
  updateTip,
  updateClothe,
  updatePaymentHistory,
  updateEvent,
  updateEncounter,
} from "./components/";
import { getTips } from "./API/tipsApi";
import { getEventById, getEvents } from "./API/eventsApi";
import { getEncounterById, getEncounters } from "./API/encountersApi";

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

        await insertClothe(dataToSend, base64Image);
      }

      const customer_uuid = await insertCustomer(
        customerById.data,
        customerImage
      );
      if (!customer_uuid) {
        return;
      }
      for (const element of payments.data) {
        await insertPaymentHistory(element, customer_uuid);
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

      await insertEmployee(employeeToSend.data, employeeImage);
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
      await insertEvent(eventDetailed.data);
    } catch (error) {
      console.error("An error occurred while inserting events");
    }
  });
}

async function putEncountersInDb(token: Token) {
  const encounters = await getEncounters(token);

  encounters.data.forEach(async (encounter: any) => {
    try {
      const encounterDetailed = await getEncounterById(token, encounter.id);
      await insertEncounter(encounterDetailed.data);
    } catch (error) {
      console.error("An error occurred while inserting encounters", error);
    }
  });
}

async function updateEmployeesInDb(token: Token) {
  const employees = await getEmployees(token);
  employees.data.forEach(async (employee) => {
    try {
      const employeeToSend = await getEmployeeById(token, employee.id);
      const employeeImage = await getEmployeeImageById(token, employee.id);

      await updateEmployee(employeeToSend.data, employeeImage);
    } catch (error) {
      console.error("An error occurred while updating employees");
    }
  });
}

async function updateCustomersInDb(token: Token) {
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

        await updateClothe(dataToSend, base64Image);
      }

      const customer_uuid = await updateCustomer(
        customerById.data,
        customerImage
      );
      if (!customer_uuid) {
        return;
      }
      for (const element of payments.data) {
        await updatePaymentHistory(element, customer_uuid);
      }
    } catch (error) {
      console.error("An error occurred while updating customers");
    }
  });
}

async function updateTipInDb(token: Token) {
  const tips = await getTips(token);

  tips.data.forEach(async (tip: any) => {
    try {
      updateTip(tip);
    } catch (error) {
      console.error("An error occurred while updating tips");
    }
  });
}

async function updateEventsInDb(token: Token) {
  const events = await getEvents(token);

  events.data.forEach(async (event: any) => {
    try {
      const eventDetailed = await getEventById(token, event.id);
      await updateEvent(eventDetailed.data);
    } catch (error) {
      console.error("An error occurred while updating events");
    }
  });
}

async function updateEncountersInDb(token: Token) {
  try {
    const encounters = await getEncounters(token);
    encounters.data.forEach(async (encounter: any) => {
      try {
        const encounterDetailed = await getEncounterById(token, encounter.id);
        await updateEncounter(encounterDetailed.data);
      } catch (error) {
        console.error("An error occurred while updating encounters", error);
      }
    });
  } catch (error) {
    console.error("An error occurred while updating encounters");
  }
}

async function fetchData(): Promise<void> {
  try {
    const token = await login();

    putEmployeesInDb(token);
    putCustomersInDb(token);
    putTipsInDb(token);
    putEventsInDb(token);
    putEncountersInDb(token);
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
}

async function updateData(): Promise<void> {
  try {
    const token = await login();

    updateEmployeesInDb(token);
    updateCustomersInDb(token);
    updateTipInDb(token);
    updateEventsInDb(token);
    updateEncountersInDb(token);
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
