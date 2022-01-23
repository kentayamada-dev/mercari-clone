import { Center } from "native-base";
import React from "react";
import { SearchBar } from "../../organisms/searchBar";
import { SearchResultsTabs } from "./tabs";
import { HomeTemplateProps } from "./types";

export const SearchResultsTemplate: React.VFC<HomeTemplateProps> = ({
  setQuery,
  goBackNavigationHandler,
  query,
  ...itemsTableProps
}) => {
  return (
    <Center flex={1}>
      <SearchBar
        goBackNavigationHandler={goBackNavigationHandler}
        setQuery={setQuery}
        query={query}
      />
      <SearchResultsTabs {...itemsTableProps} />
    </Center>
  );
};
