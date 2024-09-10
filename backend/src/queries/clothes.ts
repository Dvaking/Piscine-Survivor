import { gql } from "graphql-request";

export const InsertClothe = gql`
  mutation InsertClothes(
    $customer_id: Int
    $image: String
    $type: String
    $id: Int
  ) {
    insert_private_clothes(
      objects: {
        customer_id: $customer_id
        image: $image
        type: $type
        id: $id
      }
      on_conflict: { constraint: clothes_pkey, update_columns: customer_id }
    ) {
      affected_rows
    }
  }
`;
