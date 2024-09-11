import { gql } from "graphql-request";

// INSERT
export const InsertEvent = gql`
  mutation MyMutation(
    $date: String
    $duration: Int
    $type: String
    $name: String
    $max_participants: Int
    $location_y: String
    $location_x: String
    $location_name: String
    $id: Int
    $employee_id: Int
  ) {
    insert_private_events(
      objects: {
        date: $date
        duration: $duration
        type: $type
        name: $name
        max_participants: $max_participants
        location_y: $location_y
        location_x: $location_x
        location_name: $location_name
        id: $id
        employee_id: $employee_id
      }
      on_conflict: { constraint: events_id_key, update_columns: date }
    ) {
      returning {
        uuid
      }
    }
  }
`;
