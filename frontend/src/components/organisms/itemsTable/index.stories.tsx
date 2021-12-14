import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import faker from "faker";
import React from "react";
import { ItemRead } from "../../../generated/Api";
import { ItemsTable } from "./index";

const item = (index: number): ItemRead => ({
  id: `navigate_to_item[${index}]`,
  image_url: faker.image.imageUrl(),
  price: Number(faker.commerce.price()),
});

const items: ItemRead[] = new Array(10)
  .fill(null)
  .map((_, index) => item(index));

storiesOf("Organisms", module).add("ItemsTable", () => (
  <ItemsTable
    items={items}
    itemNavigationHandler={action("itemNavigationHandler")}
  />
));
