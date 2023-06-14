import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { createReceipt, getReceipts } from "../lib/receiptObject.ts";
import Content from "../components/Content/Content.tsx";
import Sidebar from "../components/Drawer/Sidebar.tsx";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  let q: string | null | undefined = url.searchParams.get("q");
  q = q === null ? undefined : q;
  const receipts = await getReceipts(q);
  return { receipts, q };
}

export async function action() {
  const receipt = await createReceipt();
  // return { receipt };
  return redirect(`receipt/${receipt.id}/edit`);
}

export default function Root() {
  return (
    <>
      <Sidebar />
      <Content />
    </>
  );
}
