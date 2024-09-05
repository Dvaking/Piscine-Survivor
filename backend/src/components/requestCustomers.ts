import { CustomerProps } from "../types/customer";
import { InsertCustomer, Client, UpdateCustomer } from "../queries/";

interface Customer {
  private_customers: CustomerProps[];
}

export async function insertCustomer(customer: CustomerProps, image: string) {
  let response: Customer | undefined = undefined;
  let variables = { ...customer, image };

  if (variables.image === undefined) {
    variables.image = "";
  }
  try {
    response = await Client.request(InsertCustomer, variables);
    console.log("Utilisateur inséré avec succès");
  } catch (error) {
    console.error("Erreur lors de l'insertion:", error);
  }
  return response ? response.private_customers : [];
}

export async function updateCustomer(customer: CustomerProps, image: string) {
  let response: Customer | undefined = undefined;
  let variables = { ...customer, image };

  if (variables.image === undefined) {
    variables.image = "";
  }
  try {
    response = await Client.request(UpdateCustomer, variables);
    console.log("Utilisateur mis à jour avec succès");
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
  }
  return response ? response.private_customers : [];
}
