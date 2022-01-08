import { object } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import faker from "faker";
import React from "react";
import { ItemInDatabase } from "../../../types/generated";
import { ItemDetailTemplate } from "./index";

const item: ItemInDatabase = {
  id: "item_id",
  image_url: faker.image.imageUrl(),
  price: Number(faker.commerce.price()),
  name: faker.name.lastName(),
  created_at: String(faker.date.past()),
  updated_at: String(faker.date.past()),
  description: faker.commerce.productDescription(),
  seller: {
    name: faker.name.lastName(),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
    email: faker.internet.email(),
    id: "seller_id",
    image_url: faker.image.imageUrl(),
    is_active: true,
    password: "password",
  },
};

storiesOf("Templates", module).add("ItemDetailTemplate", () => (
  <ItemDetailTemplate item={object("item", item)} />
));
