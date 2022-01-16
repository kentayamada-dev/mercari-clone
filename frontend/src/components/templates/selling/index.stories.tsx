import { storiesOf } from "@storybook/react-native";
import React from "react";
import { SellingTemplate } from "./index";
import { boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

storiesOf("Templates", module).add("SellingTemplate", () => (
  <SellingTemplate
    openModal={boolean("openModal", false)}
    sellingDetailNavigationHandler={action("sellingDetailNavigationHandler")}
    itemDetailNavigationHandler={action("itemDetailNavigationHandler")}
  />
));
