import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteReceipt } from "../lib/receipts.ts";

export async function action({ params }: ActionFunctionArgs) {
  if (params.receiptId) {
    await deleteReceipt(params.receiptId);
    return redirect("/");
  }
}
