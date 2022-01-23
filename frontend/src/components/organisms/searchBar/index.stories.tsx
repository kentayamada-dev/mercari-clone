import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { SearchBar } from "./index";
import { text } from "@storybook/addon-knobs";

storiesOf("Organisms", module).add("SearchBar", () => (
  <SearchBar
    goBackNavigationHandler={action("goBackNavigationHandler")}
    query={text("query", "query")}
    setQuery={action("setQuery")}
  />
));
