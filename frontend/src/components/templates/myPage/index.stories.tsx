import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { MyPageTemplate } from "./index";
import { action } from "@storybook/addon-actions";

storiesOf("Templates", module).add("MyPageemplate", () => (
  <MyPageTemplate
    userName={text("userName", "userName")}
    avaterUrl="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
    signupNavigationHandler={action("signupNavigationHandler")}
  />
));
