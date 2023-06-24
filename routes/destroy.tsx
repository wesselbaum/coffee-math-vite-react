import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteRecipe } from "../lib/reipeObject.ts";

export async function action({ params }: ActionFunctionArgs) {
  if (params.recipeId) {
    await deleteRecipe(params.recipeId);
    return redirect("/");
  }
}
