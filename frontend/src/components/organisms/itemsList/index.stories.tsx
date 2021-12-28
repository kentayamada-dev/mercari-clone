import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { ItemsList } from "./index";
import { Item } from "./types";

const item = (index: number): Item => ({
  label: `item[${index}]`,
  onPressHandler: action(`navigate_to_item[${index}]`),
});

const items: Item[] = new Array(10).fill(null).map((_, index) => item(index));

storiesOf("Organisms", module).add("ItemsList", () => (
  <ItemsList items={items} label={text("label", "label")} />
));
