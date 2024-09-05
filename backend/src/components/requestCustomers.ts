import { CustomerProps } from "../types/customer";
import { InsertCustomer, Client, UpdateCustomer } from "../queries/";

interface Customer {
  private_customers: CustomerProps[];
}

export async function insertCustomer(customer: CustomerProps) {
  let response: Customer | undefined = undefined;

  try {
    console.log("Juste avant l'insertion : ", customer);
    response = await Client.request(InsertCustomer, customer);
    console.log("Utilisateur inséré avec succès");
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_customers : [];
}

export async function updateCustomer(customer: CustomerProps) {
  let response: Customer | undefined = undefined;

  try {
    response = await Client.request(UpdateCustomer, customer);
    console.log("Utilisateur mis à jour avec succès");
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
  }
  return response ? response.private_customers : [];
}
