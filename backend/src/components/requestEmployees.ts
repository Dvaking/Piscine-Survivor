import { EmployeeProps } from "../types/employee";
import {
  InsertEmployee,
  Client,
  UpdateEmployee,
  InsertUser,
  UpdateUser,
} from "../queries/";

interface Employee {
  private_employees: EmployeeProps[];
}

export async function insertEmployee(
  employee: EmployeeProps,
  employeeImage: string
): Promise<string | null> {
  let response: any;
  let employeeVariables = {
    ...employee,
    image: employeeImage,
  };
  let userVariables = {
    email: employee.email,
    password: "password",
    role: employee.work,
    employee_uuid: undefined,
    customer_uuid: undefined,
  };
  if (employeeVariables.image === undefined) {
    employeeVariables.image = "";
  }
  try {
    response = await Client.request(InsertEmployee, employeeVariables);
    const uuid = response?.insert_private_employees?.returning[0]?.uuid;
    userVariables.employee_uuid = uuid;
    await Client.request(InsertUser, userVariables);
    console.log("Employee inserted successfully");
    return uuid;
  } catch (error: any) {
    if (
      error.message.includes("duplicate key value violates unique constraint")
    ) {
      console.error("Employee already exists");
      return null;
    }
    console.error("Error inserting employee");
    return null;
  }
}

export async function updateEmployee(
  employee: EmployeeProps,
  employeeImage: string
): Promise<string | null> {
  let response: any;
  let employeeVariables = {
    ...employee,
    image: employeeImage,
  };
  let userVariables = {
    email: employee.email,
    password: "password",
    role: employee.work,
    employee_uuid: undefined,
    customer_uuid: undefined,
  };
  if (employeeVariables.image === undefined) {
    employeeVariables.image = "";
  }
  try {
    response = await Client.request(UpdateEmployee, employeeVariables);
    const uuid = response?.insert_private_employees?.returning[0]?.uuid;
    userVariables.employee_uuid = uuid;
    await Client.request(UpdateUser, userVariables);
    console.log("Employee updated successfully");
    return uuid;
  } catch (error: any) {
    if (
      error.message.includes("duplicate key value violates unique constraint")
    ) {
      console.error("Employee already exists");
      return null;
    }
    console.error("Error updating employee");
    return null;
  }
}
