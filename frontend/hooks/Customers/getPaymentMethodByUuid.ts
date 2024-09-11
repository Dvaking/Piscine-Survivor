import { client, GetPaymentMethodByUuid } from "@graphql";

interface PaymentMethodResponse {
  private_payments_history: {
    payment_method: string;
  }[];
}

export async function getPaymentMethodByUuid(
  uuid: string
): Promise<PaymentMethodResponse | null> {
  try {
    const response = await client.request<PaymentMethodResponse>(
      GetPaymentMethodByUuid,
      { uuid }
    );
    return response;
  } catch (error) {
    console.error("Error fetching payment method:", error);
    return null;
  }
}
