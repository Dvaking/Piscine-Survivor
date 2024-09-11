import { gql } from "graphql-request";

// INSERT
export const InsertTip = gql`
  mutation MyMutation($id: Int, $title: String, $tip: String) {
    insert_private_tips(
      objects: { id: $id, title: $title, tip: $tip }
      on_conflict: { constraint: tips_pkey, update_columns: [id, title, tip] }
    ) {
      affected_rows
    }
  }
`;

// UPDATE
export const UpdateTip = gql`
  mutation MyMutation($id: Int, $title: String, $tip: String) {
    update_private_tips(
      where: { id: { _eq: $id } }
      _set: { title: $title, tip: $tip }
    ) {
      affected_rows
    }
  }
`;
