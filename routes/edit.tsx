import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { RecipeObject } from "../lib/recipeObject.ts";
import LabeledInput from "../components/LabeledInput.tsx";
import { Box, Button, Flex } from "@chakra-ui/react";

export default function EditContact() {
  const { recipe } = useLoaderData() as { recipe: RecipeObject };
  const navigate = useNavigate();

  return (
    <Box bg={"white"} p={4} borderRadius={10}>
      <Form method="post" id="contact-form">
        <LabeledInput
          label={"Name"}
          type={"text"}
          name={"name"}
          defaultValue={recipe.name}
          pattern="[0-9]+([\.,][0-9]+)?"
          placeholder={"Recipes name"}
        />
        <LabeledInput
          label={"Grounds capacity"}
          placeholder="2.2g"
          aria-label="Water in ground coffee capacity"
          type="number"
          step={0.1}
          name="waterInGroundCoffeeCapacity"
          defaultValue={recipe.ratioConf.waterInGroundCoffeeCapacity}
        />
        <LabeledInput
          label={"Relationship grounds"}
          placeholder="1"
          aria-label="Amount of grounds"
          type="number"
          step={1}
          name="coffeeG"
          defaultValue={recipe.ratioConf.relationship.coffeeG}
        />
        <LabeledInput
          label={"to water ml"}
          placeholder="16"
          aria-label="Amount of Water"
          type="number"
          step={1}
          name="waterMl"
          defaultValue={recipe.ratioConf.relationship.waterMl}
        />

        <Flex
          justifyContent={"flex-start"}
          flexDir={"row-reverse"}
          gap={4}
          mt={4}
        >
          <Button colorScheme={"green"} type="submit">
            Save
          </Button>
          <Button
            colorScheme={"gray"}
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
        </Flex>
      </Form>
    </Box>
  );
}
