import { t } from "i18next";
import { Box, Button, Text } from "native-base";
import React from "react";
import { typedUseColorModeValue } from "../../../theme/modules";
import { SellingTemplateProps } from "./types";
import { Ionicons } from "@expo/vector-icons";

export const SellingTemplate: React.VFC<SellingTemplateProps> = ({
  sellingDetailNavigationHandler,
}) => {
  const buttonColor = typedUseColorModeValue("buttonLight", "buttonDark");

  return (
    <Box flex={1}>
      <Button
        onPress={sellingDetailNavigationHandler}
        leftIcon={<Ionicons name="camera" size={24} color="white" />}
        colorScheme={`${buttonColor}`}
      >
        <Text bold color="brand.secondary.light">
          {t("buyNow")}
        </Text>
      </Button>
    </Box>
  );
};
