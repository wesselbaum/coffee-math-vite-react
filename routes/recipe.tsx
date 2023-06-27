import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { RecipeObject } from "../lib/recipeObject.ts";
import Calculator from "./Calculator.tsx";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

export interface RecipeParams {
  recipeId: string;
}

export default function Recipe() {
  const { recipe } = useLoaderData() as { recipe: RecipeObject };

  return (
    <Box bg={"white"} p={4} borderRadius={10}>
      <Flex flexFlow={"row nowrap"} gap={4} justify={"space-between"} mb={4}>
        <Heading>{recipe.name ? <>{recipe.name}</> : <i>No Name</i>} </Heading>
        <Favorite recipe={recipe} />
      </Flex>

      <Text mb={2}>
        Water in grounds capacity:{" "}
        <strong>{recipe.ratioConf.waterInGroundCoffeeCapacity}</strong>ml/g
      </Text>
      <Text mb={4}>
        Grounds to water ratio:{" "}
        <strong>{recipe.ratioConf.relationship.coffeeG}</strong>g/
        <strong>{recipe.ratioConf.relationship.waterMl}</strong>ml
      </Text>

      <Calculator ratioConf={recipe.ratioConf} />
      <Flex
        justifyContent={"flex-start"}
        flexDir={"row-reverse"}
        gap={4}
        mt={4}
      >
        <Form action="edit">
          <Button colorScheme={"yellow"} type="submit">
            Edit Recipe
          </Button>
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
          <Button colorScheme={"red"} type="submit">
            Delete Recipe
          </Button>
        </Form>
      </Flex>
    </Box>
  );
}

function Favorite({ recipe }: { recipe: RecipeObject }) {
  const fetcher = useFetcher();

  const favorite = recipe.favorite;
  return (
    <fetcher.Form method="post">
      <Button
        color={"yellow.500"}
        fontSize={"2xl"}
        type={"submit"}
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </Button>
    </fetcher.Form>
  );
}
