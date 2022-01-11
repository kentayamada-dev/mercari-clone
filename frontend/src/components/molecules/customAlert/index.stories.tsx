import { action } from "@storybook/addon-actions";
import { select, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { CustomAlert } from ".";

storiesOf("Molecules", module).add("CustomAlert", () => (
  <CustomAlert
    status={select("Status", ["warning", "error"], "error")}
    onPressCloseButton={action("onPressCloseButton")}
    text={text("text", "text")}
  />
));
