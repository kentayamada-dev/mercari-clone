import { Feather } from "@expo/vector-icons";
import { Box, HStack, IconButton, Text } from "native-base";
import React from "react";
import {
  typedUseColorModeValue,
  typedUseColorToken,
} from "../../../theme/modules";
import { HeaderBarProps } from "./types";

export const HeaderBar: React.VFC<HeaderBarProps> = React.memo<HeaderBarProps>(
  ({ goBackHandler, title }) => {
    const color = typedUseColorToken(
      "brand.secondary.dark",
      "brand.secondary.light"
    );
    const backgroundColor = typedUseColorModeValue(
      "brand.quaternary.light",
      "brand.quaternary.dark"
    );

    return (
      <HStack alignItems="center" padding="2">
        <Box width={goBackHandler ? "15%" : "5%"}>
          {goBackHandler && (
            <IconButton
              width={10}
              height={10}
              _pressed={{
                bg: backgroundColor,
              }}
              onPress={goBackHandler}
              icon={<Feather name="arrow-left" size={24} color={color} />}
              borderRadius="full"
            />
          )}
        </Box>
        <Box width={goBackHandler ? "85%" : "95%"}>
          <Text fontSize="2xl" isTruncated bold>
            {title}
          </Text>
        </Box>
      </HStack>
    );
  }
);
