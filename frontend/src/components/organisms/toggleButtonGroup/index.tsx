import { Button, HStack, useColorModeValue } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
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

      const invertedSecondaryColor = typedUseColorModeValue(
        "brand.secondary.dark",
        "brand.secondary.light"
      );

      const secondaryColor = typedUseColorModeValue(
        "brand.secondary.light",
        "brand.secondary.dark"
      );

      const primaryColor = typedUseColorModeValue(
        "brand.primary.light",
        "brand.primary.dark"
      );

      const rgbColor: ColorType = useColorModeValue(
        "rgb(255, 240, 240)",
        "rgba(255, 51, 51, 0.16)"
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
            borderLeftRadius="lg"
            borderRightRadius="none"
            borderWidth={getStateOnLeftButtonFocused("2", "1")}
            borderColor={getStateOnLeftButtonFocused(
              primaryColor,
              invertedSecondaryColor
            )}
            borderRightWidth={getStateOnLeftButtonFocused("2", "0")}
            backgroundColor={getStateOnLeftButtonFocused(
              rgbColor,
              secondaryColor
            )}
            onPress={leftButtonHandler}
          >
            <LeftButtonContent />
          </Button>
          <Button
            height="12"
            width={width / 3.3}
            borderRadius="none"
            borderWidth={getStateOnMiddleButtonFocused("2", "1")}
            borderLeftWidth={
              isLeftButtoFocused ? "0" : getStateOnMiddleButtonFocused("2", "1")
            }
            borderRightWidth={
              isRightButtoFocused
                ? "0"
                : getStateOnMiddleButtonFocused("2", "1")
            }
            borderColor={getStateOnMiddleButtonFocused(
              primaryColor,
              invertedSecondaryColor
            )}
            backgroundColor={getStateOnMiddleButtonFocused(
              rgbColor,
              secondaryColor
            )}
            onPress={middleButtonHandler}
          >
            <MiddleButtonContent />
          </Button>
          <Button
            height="12"
            width={width / 3.3}
            borderLeftRadius="none"
            borderRightRadius="lg"
            borderWidth={getStateOnRightButtonFocused("2", "1")}
            borderColor={getStateOnRightButtonFocused(
              primaryColor,
              invertedSecondaryColor
            )}
            borderLeftWidth={getStateOnRightButtonFocused("2", "0")}
            backgroundColor={getStateOnRightButtonFocused(
              rgbColor,
              secondaryColor
            )}
            onPress={rightButtonHandler}
          >
            <RightButtonContent />
          </Button>
        </HStack>
      );
    }
  );