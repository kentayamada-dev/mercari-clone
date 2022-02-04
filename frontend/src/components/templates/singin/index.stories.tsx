import { storiesOf } from "@storybook/react-native";
import React from "react";
import { SigninTemplate } from "./index";
import { boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

storiesOf("Templates", module).add("SigninTemplate", () => (
  <SigninTemplate
    isLoading={boolean("isLoading", false)}
    addUser={action("addUser")}
  />
));
