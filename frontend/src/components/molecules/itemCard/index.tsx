import { Box, Image, Text } from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native";
import { typedUseColorModeValue } from "../../../theme/modules";
import { ItemCardProps } from "./types";

export const ItemCard: React.VFC<ItemCardProps> = React.memo<ItemCardProps>(
  ({ price, imageUrl, isSold }) => {
    const { width } = useWindowDimensions();
    const bgColor = typedUseColorModeValue(
      "brand.primary.light",
      "brand.primary.dark"
    );

    return (
      <Box
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
        {isSold && (
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="20"
            height="10"
            bg={bgColor}
            position="absolute"
            top="-10"
            left="-30"
            style={[
              {
                transform: [{ rotate: "-45deg" }],
              },
            ]}
          >
            <Text color="white" fontWeight="bold" margin="0.5" fontSize="xs">
              SOLD
            </Text>
          </Box>
        )}
        <Box bg="rgba(0,0,0,0.5)" position="absolute" bottom="0">
          <Text color="white" fontWeight="bold" margin="0.5">
            ¥{price}
          </Text>
        </Box>
      </Box>
    );
  }
);
