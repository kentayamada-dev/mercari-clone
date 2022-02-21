import { boolean, number } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { ItemCard } from "./index";

storiesOf("Molecules", module).add("ItemCard", () => (
  <ItemCard
    isSold={boolean("isSold", false)}
    price={number("price", 35)}
    imageUrl="https://images.unsplash.com/photo-1633113090205-cc1ac795b5f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  />
));
