import { Ionicons } from "@expo/vector-icons";
import { Box, IconButton, Input } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  typedUseColorModeValue,
  typedUseColorToken,
} from "../../../theme/modules";
import { AppBarProps } from "./types";

export const AppBar: React.VFC<AppBarProps> = React.memo<AppBarProps>(
  ({ todoNavigationHandler }) => {
    const color = typedUseColorToken(
      "brand.secondary.dark",
      "brand.secondary.light"
    );

    const backgroundColor = typedUseColorModeValue(
      "brand.quaternary.light",
      "brand.quaternary.dark"
    );
    const { t } = useTranslation("home");

    return (
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        p="2"
        width="100%"
        height="12"
      >
        <Input
          variant="search"
          placeholder={t("searchForAnything")}
          borderRadius="25"
          width="80%"
          backgroundColor={backgroundColor}
          color={color}
          selectionColor={`${color}`}
        />
        <IconButton
          width="10%"
          onPress={todoNavigationHandler}
          padding="0"
          justifyContent="center"
          alignItems="center"
          icon={<Ionicons name="checkmark" size={30} color={`${color}`} />}
          _pressed={{
            bg: backgroundColor,
          }}
        />
      </Box>
    );
  }
);
