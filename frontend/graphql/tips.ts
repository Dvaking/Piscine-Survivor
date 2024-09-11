import { gql } from "graphql-request";

//GET
export const GetTips = gql`
  query GetTips {
    private_tips {
      tip
      title
      id
    }
  }
`;
