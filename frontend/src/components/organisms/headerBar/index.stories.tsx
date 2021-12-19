import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { HeaderBar } from "./index";

storiesOf("Organisms", module).add("HeaderBar", () => (
  <HeaderBar
    goBackHandler={action("goBackHandler")}
    title={text("title", "title")}
  />
));
