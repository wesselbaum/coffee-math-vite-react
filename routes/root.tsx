import {
  Form,
  LoaderFunctionArgs,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { Receipts, createReceipt, getReceipts } from "../lib/receipts.ts";
import { useEffect, useRef } from "react";

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
  const { receipts, q } = useLoaderData() as {
    receipts: Receipts[];
    q: string;
  };
  const navigation = useNavigation();
  const searchRef = useRef<HTMLInputElement>();
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.value = q;
    }
  }, [q]);

  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  return (
    <>
      <div id="sidebar">
        <h1>React Router Receipts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        {receipts.length ? (
          <ul>
            {receipts.map((receipt) => (
              <li key={receipt.id}>
                <NavLink
                  to={`receipt/${receipt.id}`}
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                >
                  {receipt.name ? <>{receipt.name}</> : <i>Unnamed</i>}{" "}
                  {receipt.favorite && <span>★</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No receipts</i>
          </p>
        )}
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
