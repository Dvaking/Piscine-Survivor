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

export const UpdateClothe = gql`
  mutation UpdateClothes(
    $customer_id: Int
    $image: String
    $type: String
    $id: Int
  ) {
    update_private_clothes(
      where: { id: { _eq: $id } }
      _set: { customer_id: $customer_id, image: $image, type: $type }
    ) {
      affected_rows
    }
  }
`;
