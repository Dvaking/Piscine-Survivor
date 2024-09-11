import { gql } from "graphql-request";

// INSERT
export const InsertEncounter = gql`
  mutation InsertEncounter(
    $id: Int
    $date: String
    $customer_uuid: uuid
    $rating: Int
    $comment: String
    $source: String
  ) {
    insert_private_encounters(
      objects: {
        id: $id
        date: $date
        customer_uuid: $customer_uuid
        rating: $rating
        comment: $comment
        source: $source
      }
      on_conflict: { constraint: encounters_pkey, update_columns: date }
    ) {
      returning {
        id
        date
        customer_uuid
        rating
      }
    }
  }
`;
