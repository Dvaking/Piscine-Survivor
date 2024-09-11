import { gql } from "graphql-request";

// INSERT
export const InsertEncounter = gql`
  mutation InsertEncounter(
    $id: Int
    $date: String
    $rating: Int
    $comment: String
    $source: String
    $customer_id: Int
  ) {
    insert_private_encounters(
      objects: {
        id: $id
        date: $date
        rating: $rating
        comment: $comment
        source: $source
        customer_id: $customer_id
      }
      on_conflict: { constraint: encounters_pkey, update_columns: date }
    ) {
      returning {
        id
        date
        rating
      }
    }
  }
`;
