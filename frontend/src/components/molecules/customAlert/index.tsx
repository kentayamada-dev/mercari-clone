import { Alert, CloseIcon, HStack, IconButton, Text } from "native-base";
import React from "react";
import { CustomAlertProps } from "./types";

export const CustomAlert: React.VFC<CustomAlertProps> =
  React.memo<CustomAlertProps>(({ onPressCloseButton, text, status }) => {
    return (
      <Alert status={status} marginBottom="20">
        <HStack space={2} alignItems="center">
          <HStack space={1} alignItems="center">
            <Alert.Icon />
            <Text fontSize="md" color="brand.secondary.dark">
              {text}
            </Text>
          </HStack>
          <IconButton
            onPress={onPressCloseButton}
            icon={<CloseIcon size="3" color="brand.secondary.dark" />}
            variant="unstyled"
          />
        </HStack>
      </Alert>
    );
  });
