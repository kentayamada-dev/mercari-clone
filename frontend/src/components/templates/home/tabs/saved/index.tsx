import { Box, Center, FlatList, Spinner } from "native-base";
import React from "react";
import { typedUseColorToken } from "../../../../../theme/modules";
import { ReadQueries } from "../../../../../types/generated";
import { ItemsList } from "../../../../organisms/itemsList";
import { Item } from "../../../../organisms/itemsList/types";
import { SavedTabProps } from "./types";

export const SavedTab: React.VFC<SavedTabProps> = React.memo<SavedTabProps>(
  ({
    savedQueries,
    isSavedQueriesRefetching,
    isNextSavedQueriesFetching,
    onFetchNextSavedQueries,
    onRefetchSavedQueries,
    savedQueriesNavigationHandler,
  }) => {
    const tintColor = typedUseColorToken(
      "brand.secondary.dark",
      "brand.secondary.light"
    );
    const backgroundColor = typedUseColorToken(
      "brand.quaternary.light",
      "brand.quaternary.dark"
    );

    const bgColor = typedUseColorToken(
      "brand.secondary.light",
      "brand.secondary.dark"
    );

    const keyExtractor = React.useCallback((page) => `${page?.skip}`, []);
    const onEndReached = React.useCallback(() => {
      if (!isNextSavedQueriesFetching) onFetchNextSavedQueries();
    }, [isNextSavedQueriesFetching]);

    const renderItem = React.useCallback(
      ({ item }: { item: ReadQueries | undefined }) => {
        let modifiedSavedQueries: Item[] = item
          ? item.data.map((savedQuery) => {
              return {
                label: savedQuery.query,
                onPressHandler: () =>
                  savedQueriesNavigationHandler(savedQuery.query),
              };
            })
          : [];

        return <ItemsList items={modifiedSavedQueries} />;
      },
      []
    );

    const renderFooterItem = React.useCallback(() => {
      return (
        <>
          {isNextSavedQueriesFetching && (
            <Center height="32">
              <Spinner size="lg" color={tintColor} marginBottom={20} />
            </Center>
          )}
        </>
      );
    }, [isNextSavedQueriesFetching]);

    const FlatListRender = React.useMemo(
      () => (
        <FlatList
          width="full"
          data={savedQueries?.pages}
          keyExtractor={keyExtractor}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          onRefresh={onRefetchSavedQueries}
          refreshing={isSavedQueriesRefetching}
          tintColor={`${tintColor}`}
          renderItem={renderItem}
          ListFooterComponent={renderFooterItem}
        />
      ),
      [
        savedQueries?.pages,
        isNextSavedQueriesFetching,
        isSavedQueriesRefetching,
      ]
    );

    return (
      <Center height="full" backgroundColor={bgColor}>
        <Box height="5" width="full" backgroundColor={backgroundColor} />
        {FlatListRender}
      </Center>
    );
  }
);
