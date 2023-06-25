import { LoaderFunctionArgs, Params } from "react-router-dom";
import { getRecipe, getRecipes } from "../lib/recipeObject.ts";
import { RecipeParams } from "./recipe.tsx";

export async function recipeLoader({ params }: { params: Params<string> }) {
  if (params) {
    const typedParams = params as unknown as RecipeParams;

    const recipe = await getRecipe(typedParams.recipeId);
    return { recipe };
  }
  return null;
}

export async function editLoader({ params }: { params: Params<string> }) {
  if (params) {
    const typedParams = params as unknown as RecipeParams;

    const recipe = await getRecipe(typedParams.recipeId);
    return { recipe };
  }
  return null;
}

export async function rootLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  let q: string | null | undefined = url.searchParams.get("q");
  q = q === null ? undefined : q;
  const recipes = await getRecipes(q);
  return { recipes, q };
}
