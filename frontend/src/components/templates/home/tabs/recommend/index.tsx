import { Box, Center, ScrollView, Text } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { RefreshControl } from "react-native";
import { typedUseColorToken } from "../../../../../theme/modules";
import { ItemsTable } from "../../../../organisms/itemsTable";
import { RecommendTabProps } from "./types";

export const RecommendTab: React.VFC<RecommendTabProps> =
  React.memo<RecommendTabProps>(
    ({ isItemsFetching, refetchItems, items, itemNavigationHandler }) => {
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

      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isItemsFetching}
              onRefresh={refetchItems}
              tintColor={`${tintColor}`}
            />
          }
        >
          <Center height="full" backgroundColor={bgColor}>
            <Box height="5" width="full" backgroundColor={backgroundColor} />
            <Box backgroundColor={bgColor} width="full" padding="3">
              <Text fontSize="xl" bold>
                {t("recommendProducts")}
              </Text>
            </Box>
            <ItemsTable
              items={items}
              itemNavigationHandler={itemNavigationHandler}
            />
          </Center>
        </ScrollView>
      );
    }
  );
