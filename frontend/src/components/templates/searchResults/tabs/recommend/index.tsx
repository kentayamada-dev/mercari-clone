import {
  Box,
  Button,
  Center,
  FlatList,
  Slide,
  Spinner,
  Text,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { useThrottle } from "../../../../../modules";
import {
  typedUseColorModeValue,
  typedUseColorToken,
} from "../../../../../theme/modules";
import { ReadItems } from "../../../../../types/generated";
import { ItemsTable } from "../../../../organisms/itemsTable";
import { RecommendTabProps } from "./types";

export const RecommendTab: React.VFC<RecommendTabProps> =
  React.memo<RecommendTabProps>(
    ({
      onRefetchItems,
      itemNavigationHandler,
      onFetchNextItems,
      addQuery,
      items,
      isItemsRefetching,
      isNextItemsFetching,
      isQuerySaved,
    }) => {
      const { t } = useTranslation(["home", "searchResults"]);
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
      const buttonColor = typedUseColorModeValue("buttonLight", "buttonDark");
      const [isBarVisible, setIsBarVisible] = React.useState(false);
      const [showButton, setShowButton] = React.useState(true);
      const throttledValue = useThrottle(isBarVisible);
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
            onScrollEndDrag={() => setIsBarVisible(true)}
            onScrollBeginDrag={() => setIsBarVisible(false)}
          />
        ),
        [items?.pages, isNextItemsFetching, isItemsRefetching]
      );

      return (
        <Center height="full" backgroundColor={bgColor}>
          <Box height="5" width="full" backgroundColor={backgroundColor} />
          <Box backgroundColor={bgColor} width="full" padding="3">
            <Text fontSize="xl" bold>
              {t("home:recommendProducts")}
            </Text>
          </Box>
          {FlatListRender}
          {!isQuerySaved && showButton && (
            <Slide in={throttledValue} placement="bottom">
              <Button
                height="16"
                bottom="0"
                w="100%"
                position="absolute"
                colorScheme={`${buttonColor}`}
                onPress={() => {
                  addQuery();
                  setShowButton(false);
                }}
              >
                <Text fontSize="2xl" bold color="brand.secondary.light">
                  {t("searchResults:saveQuery")}
                </Text>
              </Button>
            </Slide>
          )}
        </Center>
      );
    }
  );
