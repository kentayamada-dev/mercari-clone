import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { CustomAlert } from ".";

storiesOf("Molecules", module).add("CustomAlert", () => (
  <CustomAlert
    onPressCloseButton={action("onPressCloseButton")}
    text={text("text", "text")}
  />
));
