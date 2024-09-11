import { TipProps } from "../types/";
import { InsertTip, Client, UpdateTip } from "../queries/";

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

export async function updateTip(tip: TipProps) {
  let response: Tip | undefined = undefined;

  try {
    response = await Client.request(UpdateTip, tip);
    console.log("Tip updated successfully");
  } catch (error) {
    console.error("Error updating tip");
  }
  return response ? response.private_tip : [];
}
