import { Box, Image, Text } from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native";

type Props = {
  isPressed: boolean;
  price: number;
  imageUrl: string;
};

export const ItemCard: React.VFC<Props> = React.memo<Props>(
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
      >
        <Image
          source={{
            uri: imageUrl,
          }}
          alt="商品画像"
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
