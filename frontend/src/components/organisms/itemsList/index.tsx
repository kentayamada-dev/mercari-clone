import { Box, Pressable, Text } from "native-base";
import React from "react";
import { typedUseColorToken } from "../../../theme/modules";
import { ItemsListProps } from "./types";

export const ItemsList: React.VFC<ItemsListProps> = React.memo<ItemsListProps>(
  ({ items, label }) => {
    const backgroundColor = typedUseColorToken(
      "brand.quaternary.light",
      "brand.quaternary.dark"
    );
    const bgColor = typedUseColorToken(
      "brand.secondary.light",
      "brand.secondary.dark"
    );

    return (
      <>
        {label && (
          <Box width="full" backgroundColor={backgroundColor} padding="3">
            <Text fontSize="md" bold>
              {label}
            </Text>
          </Box>
        )}
        {items.map((item, index) => (
          <Pressable onPress={item.onPressHandler} key={index}>
            {({ isPressed }) => (
              <Box
                padding="4"
                backgroundColor={isPressed ? backgroundColor : bgColor}
              >
                <Text fontSize="lg">{item.label}</Text>
              </Box>
            )}
          </Pressable>
        ))}
      </>
    );
  }
);
