import { gql } from "graphql-request";

// INSERT
export const InsertPaymentHistory = gql`
  mutation MyMutation(
    $amount: money
    $comment: String
    $customer_uuid: uuid
    $date: String
    $id: Int
    $payment_method: String
  ) {
    insert_private_payments_history(
      objects: {
        amount: $amount
        comment: $comment
        customer_uuid: $customer_uuid
        date: $date
        id: $id
        payment_method: $payment_method
      }
      on_conflict: {
        constraint: payments_history_pkey
        update_columns: [amount, comment, customer_uuid, date, payment_method]
      }
    ) {
      affected_rows
    }
  }
`;
