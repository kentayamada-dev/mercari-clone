import { Pressable, SimpleGrid } from "native-base";
import React from "react";
import { ItemCard } from "../../molecules/itemCard";
import { ItemsTableProps } from "./types";

export const ItemsTable: React.VFC<ItemsTableProps> =
  React.memo<ItemsTableProps>(({ items, itemNavigationHandler }) => {
    return (
      <SimpleGrid columns={3} space={1}>
        {items?.map((item, index) => (
          <Pressable onPress={() => itemNavigationHandler(item.id)} key={index}>
            {({ isPressed }) => (
              <ItemCard
                isPressed={isPressed}
                price={item.price}
                imageUrl={item.image_url}
              />
            )}
          </Pressable>
        ))}
      </SimpleGrid>
    );
  });
