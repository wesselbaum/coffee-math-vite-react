import { addDoc, collection, getDocs, doc, getDoc } from "firebase/firestore";
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
      id: doc.id,
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
  const recipe: Partial<RecipeObject> = {
    favorite: false,
    ratioConf: {
      waterInGroundCoffeeCapacity: 2.2,
      relationship: { coffeeG: 1, waterMl: 16 },
    },
    name: "New Recipe",
  };
  const recipes = await getRecipes();
  // recipes.unshift(recipe);

  try {
    const resultRecipe = await addDoc(RECIPES_REF, {
      ...recipe,
    });
    recipe.id = resultRecipe.id;
    recipes.unshift(recipe as RecipeObject);
    console.log(`resultRecipe`, resultRecipe);
  } catch (e) {
    console.error("Error adding recipe: ", e);
  }

  await set(recipes);

  return recipe;
}

export async function getRecipe(id: string) {
  const docRef = doc(RECIPES_REF.firestore, RECIPES_REF.path, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return { ...docSnap.data(), id: docSnap.id } as RecipeObject;
  } else {
    throw new Error(`No recipe with id: ${id}`);
  }
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
