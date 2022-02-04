import { boolean, object } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { HomeTemplate } from "./index";
import faker from "faker";
import { action } from "@storybook/addon-actions";
import { GetAllQuery, GetAllItem } from "../../../types/generated";

const item = (index: number): GetAllItem => ({
  id: `navigate_to_item[${index}]`,
  image_url: faker.image.imageUrl(),
  price: Number(faker.commerce.price()),
  name: faker.name.lastName(),
});

const items: GetAllItem[] = new Array(10)
  .fill(null)
  .map((_, index) => item(index));

const savedQuery = (index: number): GetAllQuery => ({
  id: `savedQuery_id[${index}]`,
  query: `savedQuery[${index}]`,
});

const savedQueries: GetAllQuery[] = new Array(10)
  .fill(null)
  .map((_, index) => savedQuery(index));

storiesOf("Templates", module).add("HomeTemplate", () => (
  <HomeTemplate
    isNextSavedQueriesFetching={boolean("isNextSavedQueriesFetching", false)}
    isSavedQueriesRefetching={boolean("isSavedQueriesRefetching", false)}
    onFetchNextSavedQueries={action("onFetchNextSavedQueries")}
    onRefetchSavedQueries={action("onRefetchSavedQueries")}
    savedQueriesNavigationHandler={action("savedQueriesNavigationHandler")}
    savedQueries={object("savedQueries", {
      pageParams: [undefined],
      pages: [{ data: savedQueries, skip: 20 }],
    })}
    onSubmitQuery={action("onSubmitQuery")}
    onRefetchItems={action("refetchItems")}
    onFetchNextItems={action("fetchNextItems")}
    isItemsRefetching={boolean("isItemsFetching", false)}
    isNextItemsFetching={boolean("isNextItemsFetching", false)}
    itemNavigationHandler={action("itemNavigationHandler")}
    todoNavigationHandler={action("todoNavigationHandler")}
    items={object("items", {
      pageParams: [undefined],
      pages: [{ data: items, skip: 20 }],
    })}
  />
));
