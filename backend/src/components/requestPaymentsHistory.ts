import { PaymentsHistoryProps } from "../types/";
import { InsertPaymentHistory, Client } from "../queries/";

interface Customer {
  private_paymentsHistory: PaymentsHistoryProps[];
}

export async function insertPaymentHistory(payments: PaymentsHistoryProps, customer_uuid: string) {
  let response: Customer | undefined = undefined;
  let variables = { ...payments, customer_uuid };

  try {
    console.log("Inserting payment history: ", variables);
    response = await Client.request(InsertPaymentHistory, variables);
    console.log("Historique de paiement inséré avec succès");
  } catch (error) {
    console.error("Erreur lors de l'insertion de customer");
  }
  return response ? response.private_paymentsHistory : [];
}
