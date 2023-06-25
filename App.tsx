import { createHashRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root.tsx";
import ErrorPage from "./error-page.tsx";
import Recipe from "./routes/recipe.tsx";
import { recipeLoader, editLoader, rootLoader } from "./routes/loaders.ts";
import {
  recipeAction,
  destroyAction,
  editAction,
  rootAction,
} from "./routes/actions.ts";
import Edit from "./routes/edit.tsx";
import Index from "./routes";
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./firebase.ts";

const router = createHashRouter([
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
            element: <Recipe />,
            loader: recipeLoader,
            path: "/recipe/:recipeId",
            action: recipeAction,
          },
          {
            path: "/recipe/:recipeId/edit",
            element: <Edit />,
            loader: editLoader,
            action: editAction,
          },
          {
            path: "/recipe/:recipeId/destroy",
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

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

let theme = extendTheme({ colors });
const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};
theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
