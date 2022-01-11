import { MaterialIcons } from "@expo/vector-icons";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  useColorModeValue,
  VStack,
  Text,
} from "native-base";
import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  typedUseColorModeValue,
  typedUseColorToken,
} from "../../../theme/modules";
import { SigninTemplateProps } from "./types";

export const SigninTemplate: React.VFC<SigninTemplateProps> = ({
  isLoading,
  errors,
  control,
  isValid,
  addSeller,
}) => {
  const [isVisibile, setIsVisibile] = React.useState(false);
  const { t } = useTranslation(["signup", "signin"]);
  const backgroundColor = typedUseColorModeValue(
    "brand.quaternary.light",
    "brand.quaternary.dark"
  );
  const color = typedUseColorToken(
    "brand.secondary.dark",
    "brand.secondary.light"
  );
  const linkColor = typedUseColorModeValue(
    "brand.tertiary.light",
    "brand.tertiary.dark"
  );
  const warningColor = typedUseColorModeValue(
    "brand.primary.light",
    "brand.primary.dark"
  );
  const isEmailInvalid = "username" in errors;
  const isPasswordInvalid = "password" in errors;

  return (
    <VStack flex={1} space={4} padding="5">
      <FormControl isInvalid={isEmailInvalid}>
        <FormControl.Label>{t("signup:email")}</FormControl.Label>
        <Controller
          control={control}
          name="username"
          rules={{
            required: t("signup:emailRequired"),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t("signup:invalidEmail"),
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              placeholder={t("signup:email")}
              onChangeText={(val) => onChange(val)}
              value={value}
              variant="underlined"
              size="2xl"
              autoCompleteType="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              _focus={{
                borderColor: isEmailInvalid ? warningColor : linkColor,
              }}
            />
          )}
        />
        <FormControl.ErrorMessage>
          <Text color={warningColor}>{errors.username?.message}</Text>
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isInvalid={isPasswordInvalid}>
        <FormControl.Label>{t("signup:password")}</FormControl.Label>
        <Controller
          control={control}
          name="password"
          rules={{ required: t("signup:passwordRequired") }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              autoCompleteType="password"
              secureTextEntry={isVisibile ? false : true}
              textContentType="password"
              onBlur={onBlur}
              placeholder={t("signup:password")}
              onChangeText={(val) => onChange(val)}
              value={value}
              type={isVisibile ? "text" : "password"}
              variant="underlined"
              size="2xl"
              _focus={{
                borderColor: isPasswordInvalid ? warningColor : linkColor,
              }}
              InputRightElement={
                <IconButton
                  onPress={() => setIsVisibile(!isVisibile)}
                  icon={
                    <MaterialIcons
                      name={isVisibile ? "visibility" : "visibility-off"}
                      size={24}
                      color={color}
                    />
                  }
                  borderRadius="full"
                  _pressed={{
                    bg: backgroundColor,
                  }}
                />
              }
            />
          )}
        />
        <FormControl.ErrorMessage>
          <Text color={warningColor}>{errors.password?.message}</Text>
        </FormControl.ErrorMessage>
      </FormControl>
      <Button
        isLoading={isLoading}
        isLoadingText={t("signin:signing")}
        borderRadius="full"
        size="lg"
        isDisabled={!isValid}
        onPress={addSeller}
        colorScheme={useColorModeValue("buttonLight", "buttonDark")}
      >
        {t("signup:login")}
      </Button>
    </VStack>
  );
};
