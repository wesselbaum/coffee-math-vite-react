import {
  ActionFunctionArgs,
  Form,
  Params,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { ReceiptInterface } from "../lib/ReceiptInterface.ts";
import { getReceipt, updateReceipt } from "../receipts.ts";
import { ReceiptParams } from "./receipt.tsx";

export async function loader({ params }: { params: Params<string> }) {
  if (params) {
    const typedParams = params as unknown as ReceiptParams;

    const receipt = await getReceipt(typedParams.receiptId);
    return { receipt };
  }
  return null;
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  if (params.receiptId) {
    await updateReceipt(params.receiptId, updates);
    return redirect(`/receipt/${params.receiptId}`);
  }
}

export default function EditContact() {
  const { receipt } = useLoaderData() as { receipt: ReceiptInterface };
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="Receipt name"
          aria-label="Name"
          type="text"
          name="name"
          defaultValue={receipt.name}
        />
      </p>

      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
