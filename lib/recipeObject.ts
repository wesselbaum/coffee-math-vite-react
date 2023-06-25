import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { RatioConf } from "coffeemathlib/RatioCalculator";
import localforage from "localforage";
import { matchSorter } from "match-sorter";

export interface RecipeObject {
  name: string;
  id: string;
  favorite: boolean;
  ratioConf: RatioConf;
}
const RECIPES_REF = collection(db, "recipes");

export async function getRecipes(query?: string): Promise<RecipeObject[]> {
  let recipes: RecipeObject[] = [];
  await getDocs(RECIPES_REF).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    recipes = newData as unknown as RecipeObject[];
  });
  recipes.map((r) => {
    if ("recipe" in r) {
      return r.recipe as unknown as RecipeObject;
    } else {
      console.log(`r`, r);
      return r;
    }
  });
  if (query) {
    recipes = matchSorter(recipes, query, { keys: ["name"] });
  }
  return recipes as unknown as RecipeObject[];
}

export async function createRecipe() {
  const id = Math.random().toString(36).substring(2, 9);
  const recipe: RecipeObject = {
    id,
    favorite: false,
    ratioConf: {
      waterInGroundCoffeeCapacity: 2.2,
      relationship: { coffeeG: 1, waterMl: 16 },
    },
    name: "New Recipe",
  };
  const recipes = await getRecipes();
  recipes.unshift(recipe);

  try {
    await addDoc(RECIPES_REF, {
      ...recipe,
    });
  } catch (e) {
    console.error("Error adding recipe: ", e);
  }

  await set(recipes);

  return recipe;
}

export async function getRecipe(id: string) {
  const q = query(RECIPES_REF, where("id", "==", id));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length > 0) {
    return querySnapshot.docs[0].data();
  }
  throw new Error(`No recipe with id: ${id}`);
}

export async function updateRecipe(id: string, updates: Partial<RecipeObject>) {
  const recipes = (await localforage.getItem("recipes")) as RecipeObject[];
  const recipe = recipes.find((recipe) => recipe.id === id);
  if (!recipe) throw new Error(`No recipe found for ${id}`);
  Object.assign(recipe, updates);
  await set(recipes);
  return recipe;
}

export async function deleteRecipe(id: string) {
  const recipes = (await localforage.getItem("recipes")) as RecipeObject[];
  const index = recipes.findIndex((recipe) => recipe.id === id);
  if (index > -1) {
    recipes.splice(index, 1);
    await set(recipes);
    return true;
  }
  return false;
}

function set(recipes: RecipeObject[]) {
  return localforage.setItem("recipes", recipes);
}
