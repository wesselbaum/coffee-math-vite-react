import {
  ActionFunctionArgs,
  Form,
  Params,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import { getReceipt, updateReceipt } from "../receipts.ts";
import { ReceiptInterface } from "../lib/ReceiptInterface.ts";

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
  const { receipt } = useLoaderData() as { receipt: ReceiptInterface };
  console.log(`receipt loader data`, receipt);

  return (
    <div id="contact">
      <div>
        <h1>
          {receipt.name ? <>{receipt.name}</> : <i>No Name</i>}{" "}
          <Favorite receipt={receipt} />
        </h1>

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
      </div>
    </div>
  );
}

function Favorite({ receipt }: { receipt: ReceiptInterface }) {
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
