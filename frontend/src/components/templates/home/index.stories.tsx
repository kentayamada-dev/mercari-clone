import { boolean, object } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { HomeTemplate } from "./index";
import faker from "faker";
import { action } from "@storybook/addon-actions";
import { ItemRead } from "../../../types/generated";

const item = (index: number): ItemRead => ({
  id: `navigate_to_item[${index}]`,
  image_url: faker.image.imageUrl(),
  price: Number(faker.commerce.price()),
  name: faker.name.lastName(),
});

const items: ItemRead[] = new Array(10)
  .fill(null)
  .map((_, index) => item(index));

storiesOf("Templates", module).add("HomeTemplate", () => (
  <HomeTemplate
    isItemsFetching={boolean("isItemsFetching", false)}
    todoNavigationHandler={action("todoNavigationHandler")}
    itemNavigationHandler={action("itemNavigationHandler")}
    items={object("items", items)}
    refetchItems={action("refetchItems")}
  />
));
