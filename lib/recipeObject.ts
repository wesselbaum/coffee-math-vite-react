import {
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { RatioConf } from "coffeemathlib/RatioCalculator";
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
  recipes.map((recipe) => {
    if ("recipe" in recipe) {
      return recipe.recipe as unknown as RecipeObject;
    } else {
      return recipe;
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

  try {
    const resultRecipe = await addDoc(RECIPES_REF, {
      ...recipe,
    });
    recipe.id = resultRecipe.id;
    recipes.unshift(recipe as RecipeObject);
  } catch (e) {
    console.error("Error adding recipe: ", e);
  }

  return recipe;
}

export async function getRecipe(id: string) {
  const docRef = doc(RECIPES_REF.firestore, RECIPES_REF.path, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id } as RecipeObject;
  } else {
    throw new Error(`No recipe with id: ${id}`);
  }
}

export async function updateRecipe(id: string, updates: Partial<RecipeObject>) {
  const recipeRef = doc(RECIPES_REF.firestore, RECIPES_REF.path, id);
  await updateDoc(recipeRef, updates);
  return true;
}

export async function deleteRecipe(id: string) {
  const recipeRef = doc(RECIPES_REF.firestore, RECIPES_REF.path, id);
  await deleteDoc(recipeRef);
  return true;
}
