import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { ReipeObject } from "../lib/reipeObject.ts";

export default function EditContact() {
  const { recipe } = useLoaderData() as { recipe: ReipeObject };
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="Recipes name"
          aria-label="Name"
          type="text"
          name="name"
          defaultValue={recipe.name}
        />
      </p>
      <p>
        <span>Grounds capacity</span>
        <input
          placeholder="2.2g"
          aria-label="Water in ground coffee capacity"
          type="number"
          step={0.1}
          name="waterInGroundCoffeeCapacity"
          defaultValue={recipe.ratioConf.waterInGroundCoffeeCapacity}
        />
      </p>
      <p>
        <span>Relationship grounds</span>
        <input
          placeholder="1"
          aria-label="Amount of grounds"
          type="number"
          step={1}
          name="coffeeG"
          defaultValue={recipe.ratioConf.relationship.coffeeG}
        />
      </p>
      <p>
        <span>to water ml</span>
        <input
          placeholder="16"
          aria-label="Amount of Water"
          type="number"
          step={1}
          name="waterMl"
          defaultValue={recipe.ratioConf.relationship.waterMl}
        />
      </p>

      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
