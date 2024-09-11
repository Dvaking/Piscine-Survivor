import { client, GetPaymentMethodByUuid } from "@graphql";
import { refreshToken } from "@hooks";

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
    if (
      (error as any).response &&
      (error as any).response.errors &&
      (error as any).response.errors[0].message === "JWTExpired"
    ) {
      const refresh = await refreshToken();
      if (refresh)
        try {
          const response = await client.request<PaymentMethodResponse>(
            GetPaymentMethodByUuid,
            { uuid }
          );
          return response;
        } catch (error) {
          console.error("Erreur lors de l'insertion:", error);
        }
    }
    return null;
  }
}
