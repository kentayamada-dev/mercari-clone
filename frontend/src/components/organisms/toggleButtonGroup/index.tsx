import { Button, HStack, useColorModeValue } from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native";
import { typedUseColorModeValue } from "../../../theme/modules";
import { ToggleButtonGroupProps } from "./types";

export const ToggleButtonGroup: React.VFC<ToggleButtonGroupProps> =
  React.memo<ToggleButtonGroupProps>(
    ({
      isLeftButtoFocused,
      isMiddleButtoFocused,
      isRightButtoFocused,
      leftButtonHandler,
      middleButtonHandler,
      rightButtonHandler,
      LeftButtonContent,
      MiddleButtonContent,
      RightButtonContent,
    }) => {
      const { width } = useWindowDimensions();
      const primaryColor = typedUseColorModeValue(
        "buttonLight.50",
        "buttonDark.600"
      );

      const getStateOnLeftButtonFocused = <T,>(onFocused: T, notOnFocused: T) =>
        isLeftButtoFocused ? onFocused : notOnFocused;

      const getStateOnMiddleButtonFocused = <T,>(
        onFocused: T,
        notOnFocused: T
      ) => (isMiddleButtoFocused ? onFocused : notOnFocused);

      const getStateOnRightButtonFocused = <T,>(
        onFocused: T,
        notOnFocused: T
      ) => (isRightButtoFocused ? onFocused : notOnFocused);

      return (
        <HStack justifyContent="center">
          <Button
            height="12"
            width={width / 3.3}
            variant="outline"
            onPress={leftButtonHandler}
            colorScheme={useColorModeValue("buttonLight", "buttonDark")}
            borderRightRadius="none"
            borderRightWidth={0}
            backgroundColor={getStateOnLeftButtonFocused(
              primaryColor,
              undefined
            )}
          >
            <LeftButtonContent />
          </Button>
          <Button
            height="12"
            width={width / 3.3}
            variant="outline"
            colorScheme={useColorModeValue("buttonLight", "buttonDark")}
            onPress={middleButtonHandler}
            borderRadius="none"
            backgroundColor={getStateOnMiddleButtonFocused(
              primaryColor,
              undefined
            )}
          >
            <MiddleButtonContent />
          </Button>
          <Button
            height="12"
            width={width / 3.3}
            variant="outline"
            colorScheme={useColorModeValue("buttonLight", "buttonDark")}
            onPress={rightButtonHandler}
            borderLeftRadius="none"
            borderLeftWidth={0}
            backgroundColor={getStateOnRightButtonFocused(
              primaryColor,
              undefined
            )}
          >
            <RightButtonContent />
          </Button>
        </HStack>
      );
    }
  );
