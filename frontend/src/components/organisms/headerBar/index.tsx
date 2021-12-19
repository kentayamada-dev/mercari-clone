import { Feather } from "@expo/vector-icons";
import { HStack, IconButton, Text } from "native-base";
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
      <HStack space={10} alignItems="center" padding={2}>
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
        <Text fontSize="2xl" isTruncated width="60%">
          {title}
        </Text>
      </HStack>
    );
  }
);
