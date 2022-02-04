import { action } from "@storybook/addon-actions";
import { object } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import faker from "faker";
import React from "react";
import { GetAllItem } from "../../../types/generated";
import { ItemsTable } from "./index";

const item = (index: number): GetAllItem => ({
  id: `navigate_to_item[${index}]`,
  image_url: faker.image.imageUrl(),
  price: Number(faker.commerce.price()),
  name: faker.name.lastName(),
});

const items: GetAllItem[] = new Array(10)
  .fill(null)
  .map((_, index) => item(index));

storiesOf("Organisms", module).add("ItemsTable", () => (
  <ItemsTable
    items={object("items", items)}
    itemNavigationHandler={action("itemNavigationHandler")}
  />
));
