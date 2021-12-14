import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { HomeTemplate } from "./index";
import faker from "faker";
import { Item } from "../../../generated/Api";
import { action } from "@storybook/addon-actions";

const item = (index: number): Item => ({
  created_at: String(faker.datatype.datetime()),
  updated_at: String(faker.datatype.datetime()),
  description: faker.commerce.productDescription(),
  id: `navigate_to_item[${index}]`,
  image_url: faker.image.imageUrl(),
  name: faker.name.lastName(),
  price: Number(faker.commerce.price()),
  seller_id: faker.datatype.uuid(),
});

const items: Item[] = new Array(10).fill(null).map((_, index) => item(index));

storiesOf("Templates", module).add("HomeTemplate", () => (
  <HomeTemplate
    isItemsFetching={boolean("isItemsFetching", false)}
    todoNavigationHandler={action("todoNavigationHandler")}
    itemNavigationHandler={action("itemNavigationHandler")}
    items={items}
    refetchItems={action("refetchItems")}
  />
));
