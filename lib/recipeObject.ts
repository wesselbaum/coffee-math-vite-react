import {
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { RatioConf } from "coffeemathlib/RatioCalculator";
import { matchSorter } from "match-sorter";

export interface RecipeObject {
  creatorId: string;
  name: string;
  id: string;
  favorite: boolean;
  ratioConf: RatioConf;
}
const RECIPES_REF = collection(db, "recipes");

export async function getRecipes(
  queryString?: string
): Promise<RecipeObject[]> {
  let recipes: RecipeObject[] = [];
  const q = query(
    RECIPES_REF,
    where("creatorId", "==", "ZHofiy9xRBNnBqyLfFN7ceW9HWA2")
  );

  console.log(`1`);

  try {
    await getDocs(q).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      recipes = newData as unknown as RecipeObject[];
    });

    console.log(`2`);
    recipes.map((recipe) => {
      if ("recipe" in recipe) {
        return recipe.recipe as unknown as RecipeObject;
      } else {
        return recipe;
      }
    });
    if (queryString) {
      recipes = matchSorter(recipes, queryString, { keys: ["name"] });
    }
    return recipes as unknown as RecipeObject[];
  } catch (e: unknown) {
    console.error(e);
    return recipes;
  }
}

export async function createRecipe(creatorId: string) {
  const recipe: Partial<RecipeObject> = {
    creatorId,
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
