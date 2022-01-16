import { Box, Center, FlatList, Spinner, Text } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { typedUseColorToken } from "../../../../../theme/modules";
import { ReadItems } from "../../../../../types/generated";
import { ItemsTable } from "../../../../organisms/itemsTable";
import { RecommendTabProps } from "./types";

export const RecommendTab: React.VFC<RecommendTabProps> =
  React.memo<RecommendTabProps>(
    ({
      onRefetchItems,
      itemNavigationHandler,
      onFetchNextItems,
      items,
      isItemsRefetching,
      isNextItemsFetching,
    }) => {
      const { t } = useTranslation("home");
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

      const keyExtractor = React.useCallback((page) => `${page.skip}`, []);
      const onEndReached = React.useCallback(() => {
        if (!isNextItemsFetching) onFetchNextItems();
      }, [isNextItemsFetching]);

      const renderItem = React.useCallback(
        ({ item }: { item: ReadItems }) => (
          <ItemsTable
            items={item.data}
            itemNavigationHandler={itemNavigationHandler}
          />
        ),
        []
      );

      const renderFooterItem = React.useCallback(() => {
        return (
          <>
            {isNextItemsFetching && (
              <Center height="32">
                <Spinner size="lg" color={tintColor} marginBottom={20} />
              </Center>
            )}
          </>
        );
      }, [isNextItemsFetching]);

      const FlatListRender = React.useMemo(
        () => (
          <FlatList
            data={items?.pages}
            keyExtractor={keyExtractor}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
            onRefresh={onRefetchItems}
            refreshing={isItemsRefetching}
            tintColor={`${tintColor}`}
            renderItem={renderItem}
            ListFooterComponent={renderFooterItem}
          />
        ),
        [items?.pages, isNextItemsFetching, isItemsRefetching]
      );

      return (
        <Center height="full" backgroundColor={bgColor}>
          <Box height="5" width="full" backgroundColor={backgroundColor} />
          <Box backgroundColor={bgColor} width="full" padding="3">
            <Text fontSize="xl" bold>
              {t("recommendProducts")}
            </Text>
          </Box>
          {FlatListRender}
        </Center>
      );
    }
  );
