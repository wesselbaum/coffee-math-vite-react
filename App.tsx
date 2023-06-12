import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root.tsx";
import ErrorPage from "./error-page.tsx";
import Receipt, {
  loader as receiptLoader,
  action as receiptAction,
} from "./routes/receipt.tsx";
import Edit, {
  loader as editLoader,
  action as editAction,
} from "./routes/edit.tsx";
import { action as destroyAction } from "./routes/destroy.tsx";
import Index from "./routes";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            element: <Receipt />,
            loader: receiptLoader,
            path: "/receipt/:receiptId",
            action: receiptAction,
          },
          {
            path: "/receipt/:receiptId/edit",
            element: <Edit />,
            loader: editLoader,
            action: editAction,
          },
          {
            path: "/receipt/:receiptId/destroy",
            action: destroyAction,
            errorElement: <div>Deletion failed!</div>,
          },
        ],
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
