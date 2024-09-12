import { CustomerProps } from "../types/customer";
import {
  InsertCustomer,
  Client,
  UpdateCustomer,
  InsertUser,
  UpdateUser,
} from "../queries/";

interface Customer {
  private_customers: CustomerProps[];
}

export async function insertCustomer(
  customer: CustomerProps,
  image: string
): Promise<string | null> {
  let response: any;
  let customerVariables = { ...customer, image };

  if (customerVariables.image === undefined) {
    customerVariables.image = "";
  }
  let userVariables = {
    email: customer.email,
    password: "password",
    role: "customer",
    employee_uuid: undefined,
    customer_uuid: undefined,
  };
  try {
    response = await Client.request(InsertCustomer, customerVariables);
    const uuid = response?.insert_private_customers?.returning[0]?.uuid;
    userVariables.customer_uuid = uuid;
    await Client.request(InsertUser, userVariables);
    console.log("Customer inserted successfully");
    return uuid;
  } catch (error: any) {
    if (
      error.message.includes("duplicate key value violates unique constraint")
    ) {
      console.error("Customer already exists");
      return null;
    }
    console.error("Error inserting customer");
    return null;
  }
}

export async function updateCustomer(
  customer: CustomerProps,
  image: string
): Promise<string | null> {
  let response: any;
  let customerVariables = { ...customer, image };

  if (customerVariables.image === undefined) {
    customerVariables.image = "";
  }
  let userVariables = {
    email: customer.email,
    password: "password",
    role: "customer",
    employee_uuid: undefined,
    customer_uuid: undefined,
  };
  try {
    response = await Client.request(UpdateCustomer, customerVariables);
    const uuid = response?.insert_private_customers?.returning[0]?.uuid;
    userVariables.customer_uuid = uuid;
    await Client.request(UpdateUser, userVariables);
    console.log("Customer updated successfully");
    return uuid;
  } catch (error: any) {
    if (
      error.message.includes("duplicate key value violates unique constraint")
    ) {
      console.error("Customer already exists");
      return null;
    }
    console.error("Error updating customer", error);
    return null;
  }
}
