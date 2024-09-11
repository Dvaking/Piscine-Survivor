import { PaymentsHistoryProps } from "../types/";
import { InsertPaymentHistory, Client } from "../queries/";

interface Customer {
  private_paymentsHistory: PaymentsHistoryProps[];
}

export async function insertPaymentHistory(
  payments: PaymentsHistoryProps,
  customer_uuid: string
) {
  let response: Customer | undefined = undefined;
  let variables = { ...payments, customer_uuid };

  try {
    response = await Client.request(InsertPaymentHistory, variables);
    console.log("Payment history inserted successfully");
  } catch (error) {
    console.error("Error inserting payment history");
  }
  return response ? response.private_paymentsHistory : [];
}
