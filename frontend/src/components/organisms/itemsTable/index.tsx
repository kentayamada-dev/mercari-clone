import { Pressable, SimpleGrid } from "native-base";
import React from "react";
import { ItemCard } from "../../molecules/itemCard";
import { ItemsTableProps } from "./types";

export const ItemsTable: React.VFC<ItemsTableProps> =
  React.memo<ItemsTableProps>(({ items, itemNavigationHandler }) => {
    return (
      <SimpleGrid columns={3} space={1} marginBottom="1">
        {items?.map((item) => (
          <Pressable
            onPress={() => itemNavigationHandler(item.id, item.name)}
            key={item.id}
            _pressed={{
              opacity: 0.5,
            }}
          >
            <ItemCard
              isSold={!!item.order}
              price={item.price}
              imageUrl={item.image_url}
            />
          </Pressable>
        ))}
      </SimpleGrid>
    );
  });
