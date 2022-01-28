import { boolean, object, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { SearchResultsTemplate } from "./index";
import faker from "faker";
import { action } from "@storybook/addon-actions";
import { ItemRead } from "../../../types/generated";

const item = (index: number): ItemRead => ({
  id: `navigate_to_item[${index}]`,
  image_url: faker.image.imageUrl(),
  price: Number(faker.commerce.price()),
  name: faker.name.lastName(),
});

const items: ItemRead[] = new Array(10)
  .fill(null)
  .map((_, index) => item(index));

storiesOf("Templates", module).add("SearchResultsTemplate", () => (
  <SearchResultsTemplate
    isQuerySaved={boolean("isQuerySaved", false)}
    addQuery={action("addQuery")}
    query={text("query", "query")}
    setQuery={action("setQuery")}
    onRefetchItems={action("refetchItems")}
    onFetchNextItems={action("fetchNextItems")}
    isItemsRefetching={boolean("isItemsFetching", false)}
    isNextItemsFetching={boolean("isNextItemsFetching", false)}
    itemNavigationHandler={action("itemNavigationHandler")}
    goBackNavigationHandler={action("goBackNavigationHandler")}
    items={object("items", {
      pageParams: [undefined],
      pages: [{ data: items, skip: 20 }],
    })}
  />
));
