import { TipProps } from "../types/";
import { InsertTip, Client } from "../queries/";

interface Tip {
  private_tip: TipProps[];
}

export async function insertTip(tip: TipProps) {
  let response: Tip | undefined = undefined;

  try {
    response = await Client.request(InsertTip, tip);
    console.log("Tip inserted successfully");
  } catch (error) {
    console.error("Error inserting tip");
  }
  return response ? response.private_tip : [];
}
