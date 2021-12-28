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
import { SignupTemplateProps } from "./types";

export const SignupTemplate: React.VFC<SignupTemplateProps> = ({
  isLoading,
  errors,
  control,
  isValid,
  addSeller,
}) => {
  const [isVisibile, setIsVisibile] = React.useState(false);
  const backgroundColor = typedUseColorModeValue(
    "brand.quaternary.light",
    "brand.quaternary.dark"
  );
  const color = typedUseColorToken(
    "brand.secondary.dark",
    "brand.secondary.light"
  );
  const { t } = useTranslation("signup");

  return (
    <VStack space={4}>
      <FormControl isInvalid={"name" in errors}>
        <FormControl.Label>{t("name")}</FormControl.Label>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              placeholder={t("name")}
              onChangeText={(val) => onChange(val)}
              value={value}
              variant="underlined"
              size="2xl"
            />
          )}
        />
        <FormControl.ErrorMessage>
          {errors.name?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isInvalid={"email" in errors}>
        <FormControl.Label>{t("email")}</FormControl.Label>
        <Controller
          control={control}
          name="email"
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
            />
          )}
        />
        <FormControl.ErrorMessage>
          {errors.email?.message}
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
        {t("register")}
      </Button>
    </VStack>
  );
};
