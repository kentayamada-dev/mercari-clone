import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { ItemDetailLabel } from "./index";

storiesOf("Molecules", module).add("ItemDetailLabel", () => (
  <ItemDetailLabel label={text("label", "ラベル")} />
));
