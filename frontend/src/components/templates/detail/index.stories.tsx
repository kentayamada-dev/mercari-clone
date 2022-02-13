import { action } from "@storybook/addon-actions";
import { boolean, number, object } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import faker from "faker";
import React from "react";
import { GetItemById } from "../../../types/generated";
import { ItemDetailTemplate } from "./index";

const item: GetItemById = {
  id: "item_id",
  price: Number(faker.commerce.price()),
  image_url: faker.image.imageUrl(),
  name: faker.name.lastName(),
  description: faker.commerce.productDescription(),
  user: {
    id: "user_id",
    name: faker.name.lastName(),
    image_url: faker.image.imageUrl(),
  },
  liked_users: [
    {
      id: "liked_user_id",
    },
  ],
};

storiesOf("Templates", module).add("ItemDetailTemplate", () => (
  <ItemDetailTemplate
    isSold={boolean("isSold", false)}
    item={object("item", item)}
    isItemLiked={boolean("isItemLiked", false)}
    addLike={action("addLike")}
    removeLike={action("removeLike")}
    order={action("order")}
    numLikes={number("numLikes", 35)}
  />
));
