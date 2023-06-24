import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { ReipeObject } from "../lib/reipeObject.ts";
import Calculator from "./Calculator.tsx";

export interface RecipeParams {
  recipeId: string;
}

export default function Recipe() {
  const { recipe } = useLoaderData() as { recipe: ReipeObject };

  return (
    <div id="contact">
      <div>
        <h1>
          {recipe.name ? <>{recipe.name}</> : <i>No Name</i>}{" "}
          <Favorite recipe={recipe} />
        </h1>

        <p>
          Water in grounds capacity:{" "}
          <strong>{recipe.ratioConf.waterInGroundCoffeeCapacity}</strong>ml/g
        </p>
        <p>
          Grounds to water ratio:{" "}
          <strong>{recipe.ratioConf.relationship.coffeeG}</strong>g/
          <strong>{recipe.ratioConf.relationship.waterMl}</strong>ml
        </p>

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>

        <Calculator ratioConf={recipe.ratioConf} />
      </div>
    </div>
  );
}

function Favorite({ recipe }: { recipe: ReipeObject }) {
  const fetcher = useFetcher();

  const favorite = recipe.favorite;
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
