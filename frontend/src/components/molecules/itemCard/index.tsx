import { Box, Image, Text } from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native";
import { ItemCardProps } from "./types";

export const ItemCard: React.VFC<ItemCardProps> = React.memo<ItemCardProps>(
  ({ isPressed, price, imageUrl }) => {
    const { width } = useWindowDimensions();

    return (
      <Box
        opacity={isPressed ? 0.8 : 1}
        position="relative"
        width={width / 3.1}
        height={width / 3.1}
        rounded="md"
        overflow="hidden"
        key={imageUrl}
      >
        <Image
          source={{
            uri: imageUrl,
          }}
          alt="image"
          width="full"
          height="full"
        />
        <Box bg="rgba(0,0,0,0.5)" position="absolute" bottom="0">
          <Text color="white" fontWeight="bold" margin="0.5">
            ¥{price}
          </Text>
        </Box>
      </Box>
    );
  }
);
