import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { AppBar } from "./index";

storiesOf("Organisms", module).add("AppBar", () => (
  <AppBar
    todoNavigationHandler={action("todoNavigationHandler")}
    onSubmitQuery={action("onSubmitQuery")}
  />
));
