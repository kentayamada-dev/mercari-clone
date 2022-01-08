import { MaterialIcons } from "@expo/vector-icons";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  useColorModeValue,
  VStack,
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
  const { t } = useTranslation("signup");
  const backgroundColor = typedUseColorModeValue(
    "brand.quaternary.light",
    "brand.quaternary.dark"
  );
  const color = typedUseColorToken(
    "brand.secondary.dark",
    "brand.secondary.light"
  );

  return (
    <VStack flex={1} space={4} padding="5">
      <FormControl isInvalid={"username" in errors}>
        <FormControl.Label>{t("email")}</FormControl.Label>
        <Controller
          control={control}
          name="username"
          rules={{
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t("invalidEmail"),
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              placeholder={t("email")}
              onChangeText={(val) => onChange(val)}
              value={value}
              variant="underlined"
              size="2xl"
              autoCompleteType="email"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
          )}
        />
        <FormControl.ErrorMessage>
          {errors.username?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isInvalid={"password" in errors}>
        <FormControl.Label>{t("password")}</FormControl.Label>
        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              autoCompleteType="password"
              secureTextEntry={isVisibile ? false : true}
              textContentType="password"
              onBlur={onBlur}
              placeholder={t("password")}
              onChangeText={(val) => onChange(val)}
              value={value}
              type={isVisibile ? "text" : "password"}
              variant="underlined"
              size="2xl"
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
          {errors.password?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <Button
        isLoading={isLoading}
        isLoadingText={t("registering")}
        borderRadius="full"
        size="lg"
        isDisabled={!isValid}
        onPress={addSeller}
        colorScheme={useColorModeValue("buttonLight", "buttonDark")}
      >
        {t("login")}
      </Button>
    </VStack>
  );
};
