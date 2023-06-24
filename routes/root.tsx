import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { createRecipe, getRecipes } from "../lib/reipeObject.ts";
import Content from "../components/Content/Content.tsx";
import Sidebar from "../components/Drawer/Sidebar.tsx";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  let q: string | null | undefined = url.searchParams.get("q");
  q = q === null ? undefined : q;
  const recipes = await getRecipes(q);
  return { recipes, q };
}

export async function action() {
  const recipe = await createRecipe();
  return redirect(`recipe/${recipe.id}/edit`);
}

export default function Root() {
  return (
    <>
      <Sidebar />
      <Content />
    </>
  );
}
