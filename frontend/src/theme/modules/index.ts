import { useColorModeValue, useToken } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";

export const typedUseColorModeValue = (
  lightTheme: ColorType,
  darkTheme: ColorType
): ColorType => useColorModeValue(lightTheme, darkTheme);

export const typedUseColorToken = (
  lightTheme: ColorType,
  darkTheme: ColorType
) => {
  const [colorContrastDark, colorContrastLight] = useToken("colors", [
    `${darkTheme}`,
    `${lightTheme}`,
  ]);
  return useColorModeValue(colorContrastLight, colorContrastDark);
};
