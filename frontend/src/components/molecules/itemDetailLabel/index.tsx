import { Box, Text } from "native-base";
import React from "react";
import { typedUseColorToken } from "../../../theme/modules";
import { ItemDetailLabelProps } from "./types";

export const ItemDetailLabel: React.VFC<ItemDetailLabelProps> =
  React.memo<ItemDetailLabelProps>(({ label }) => {
    const linkColor = typedUseColorToken(
      "brand.tertiary.light",
      "brand.tertiary.dark"
    );
    const backgroundColor = typedUseColorToken(
      "brand.quaternary.light",
      "brand.quaternary.dark"
    );

    return (
      <Box
        height="24"
        width="full"
        position="relative"
        padding="5"
        backgroundColor={backgroundColor}
      >
        <Text
          fontSize="lg"
          position="absolute"
          bottom="3"
          left="5"
          color={linkColor}
          bold
        >
          {label}
        </Text>
      </Box>
    );
  });
