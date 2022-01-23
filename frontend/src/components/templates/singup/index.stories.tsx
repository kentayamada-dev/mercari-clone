import { storiesOf } from "@storybook/react-native";
import React from "react";
import { SignupTemplate } from "./index";
import { boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

storiesOf("Templates", module).add("SignupTemplate", () => (
  <SignupTemplate
    addSeller={action("isLoading")}
    isLoading={boolean("isLoading", false)}
    isLoadingImage={boolean("isLoadingImage", false)}
    uploadImage={action("uploadImage")}
    imageUrl="https://images.unsplash.com/photo-1633113090205-cc1ac795b5f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    signinNavigationHandler={action("signinNavigationHandler")}
  />
));
