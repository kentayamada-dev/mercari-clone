import { object } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import faker from "faker";
import React from "react";
import { Item } from "../../../types/generated";
import { DetailTemplate } from "./index";

const item: Item = {
  id: "item_id",
  image_url: faker.image.imageUrl(),
  price: Number(faker.commerce.price()),
  name: faker.name.lastName(),
  created_at: String(faker.date.past()),
  updated_at: String(faker.date.past()),
  description: faker.commerce.productDescription(),
  seller_id: "seller_id",
};

storiesOf("Templates", module).add("DetailTemplate", () => (
  <DetailTemplate item={object("item", item)} />
));
