import {
  ActionFunctionArgs,
  Form,
  Params,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { Receipts, getReceipt, updateReceipt } from "../lib/receipts.ts";
import { ReceiptParams } from "./receipt.tsx";

export async function loader({ params }: { params: Params<string> }) {
  if (params) {
    const typedParams = params as unknown as ReceiptParams;

    const receipt = await getReceipt(typedParams.receiptId);
    return { receipt };
  }
  return null;
}

const mapUpdateToReceipt = (updates: any): Partial<Receipts> => {
  return {
    name: updates.name,
    ratioConf: {
      waterInGroundCoffeeCapacity: updates.waterInGroundCoffeeCapacity,
      relationship: {
        waterMl: updates.waterMl,
        coffeeG: updates.coffeeG,
      },
    },
  };
};

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updates = mapUpdateToReceipt(Object.fromEntries(formData));

  if (params.receiptId) {
    await updateReceipt(params.receiptId, updates);
    return redirect(`/receipt/${params.receiptId}`);
  }
}

export default function EditContact() {
  const { receipt } = useLoaderData() as { receipt: Receipts };
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="Receipts name"
          aria-label="Name"
          type="text"
          name="name"
          defaultValue={receipt.name}
        />
      </p>
      <p>
        <span>Grounds capacity</span>
        <input
          placeholder="2.2g"
          aria-label="Water in ground coffee capacity"
          type="number"
          step={0.1}
          name="waterInGroundCoffeeCapacity"
          defaultValue={receipt.ratioConf.waterInGroundCoffeeCapacity}
        />
      </p>
      <p>
        <span>Relationship grounds</span>
        <input
          placeholder="1"
          aria-label="Amount of grounds"
          type="number"
          step={1}
          name="coffeeG"
          defaultValue={receipt.ratioConf.relationship.coffeeG}
        />
      </p>
      <p>
        <span>to water ml</span>
        <input
          placeholder="16"
          aria-label="Amount of Water"
          type="number"
          step={1}
          name="waterMl"
          defaultValue={receipt.ratioConf.relationship.waterMl}
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
