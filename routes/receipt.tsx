import {
  ActionFunctionArgs,
  Form,
  Params,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import { Receipts, getReceipt, updateReceipt } from "../lib/receipts.ts";
import Calculator from "./Calculator.tsx";

export interface ReceiptParams {
  receiptId: string;
}

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
  if (params.receiptId) {
    return updateReceipt(params.receiptId, {
      favorite: formData.get("favorite") === "true",
    });
  }
}

export default function Receipt() {
  // const receipt = {
  //   name: "name",
  //   favorite: true,
  // };
  const { receipt } = useLoaderData() as { receipt: Receipts };

  return (
    <div id="contact">
      <div>
        <h1>
          {receipt.name ? <>{receipt.name}</> : <i>No Name</i>}{" "}
          <Favorite receipt={receipt} />
        </h1>

        <p>
          Water in grounds capacity:{" "}
          <strong>{receipt.ratioConf.waterInGroundCoffeeCapacity}</strong>ml/g
        </p>
        <p>
          Grounds to water ratio:{" "}
          <strong>{receipt.ratioConf.relationship.coffeeG}</strong>g/
          <strong>{receipt.ratioConf.relationship.waterMl}</strong>ml
        </p>

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>

        <Calculator ratioConf={receipt.ratioConf} />
      </div>
    </div>
  );
}

function Favorite({ receipt }: { receipt: Receipts }) {
  const fetcher = useFetcher();

  const favorite = receipt.favorite;
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
