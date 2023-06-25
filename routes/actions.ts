import { ActionFunctionArgs, redirect } from "react-router-dom";
import {
  createRecipe,
  deleteRecipe,
  RecipeObject,
  updateRecipe,
} from "../lib/recipeObject.ts";

const mapUpdateToRecipe = (updates: any): Partial<RecipeObject> => {
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

export async function recipeAction({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  if (params.recipeId) {
    return updateRecipe(params.recipeId, {
      favorite: formData.get("favorite") === "true",
    });
  }
}

export async function destroyAction({ params }: ActionFunctionArgs) {
  if (params.recipeId) {
    await deleteRecipe(params.recipeId);
    return redirect("/");
  }
}

export async function editAction({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updates = mapUpdateToRecipe(Object.fromEntries(formData));

  if (params.recipeId) {
    await updateRecipe(params.recipeId, updates);
    return redirect(`/recipe/${params.recipeId}`);
  }
}

export async function rootAction() {
  const recipe = await createRecipe();
  return redirect(`recipe/${recipe.id}/edit`);
}
