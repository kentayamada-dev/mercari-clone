import { storiesOf } from "@storybook/react-native";
import React from "react";
import { SellerDetailTemplate } from "./index";
import faker from "faker";
import { ItemRead } from "../../../types/generated";
import { action } from "@storybook/addon-actions";
import { boolean, object } from "@storybook/addon-knobs";

const item = (index: number): ItemRead => ({
  id: `navigate_to_item[${index}]`,
  image_url: faker.image.imageUrl(),
  price: Number(faker.commerce.price()),
  name: faker.name.lastName(),
});

const items: ItemRead[] = new Array(5)
  .fill(null)
  .map((_, index) => item(index));

storiesOf("Templates", module).add("SellerDetailTemplate", () => (
  <SellerDetailTemplate
    isSellerFetching={boolean("isSellerFetching", false)}
    seller={object("seller", {
      id: "123",
      name: "name",
      email: "email",
      image_url:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      items: items,
    })}
    itemNavigationHandler={action("itemNavigationHandler")}
    refetchSeller={action("refetchSeller")}
  />
));
