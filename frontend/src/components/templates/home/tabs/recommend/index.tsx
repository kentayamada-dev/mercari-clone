import { Center, ScrollView } from "native-base";
import React from "react";
import { RefreshControl } from "react-native";
import { typedUseColorToken } from "../../../../../theme/modules";
import { ItemsTable } from "../../../../organisms/itemsTable";
import { SkeletonTable } from "../../../../organisms/skeletonTable";
import { RecommendTabProps } from "./types";

export const RecommendTab: React.VFC<RecommendTabProps> =
  React.memo<RecommendTabProps>(
    ({ isItemsFetching, refetchItems, items, itemNavigationHandler }) => {
      const tintColor = typedUseColorToken(
        "brand.secondary.dark",
        "brand.secondary.light"
      );

      if (!items) return <SkeletonTable numbers={10} />;

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
          <Center height="full">
            <ItemsTable
              items={items}
              itemNavigationHandler={itemNavigationHandler}
            />
          </Center>
        </ScrollView>
      );
    }
  );
