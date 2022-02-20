import { Ionicons } from "@expo/vector-icons";
import { Box, IconButton, Input } from "native-base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  typedUseColorModeValue,
  typedUseColorToken,
} from "../../../theme/modules";
import { AppBarProps } from "./types";

export const AppBar: React.VFC<AppBarProps> = React.memo<AppBarProps>(
  ({ todoNavigationHandler, onSubmitQuery }) => {
    const color = typedUseColorToken(
      "brand.secondary.dark",
      "brand.secondary.light"
    );

    const backgroundColor = typedUseColorModeValue(
      "brand.quaternary.light",
      "brand.quaternary.dark"
    );
    const { t } = useTranslation("home");
    const { control, handleSubmit, reset } = useForm<{ query: string }>({
      defaultValues: {
        query: "",
      },
    });

    return (
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        p="2"
        width="100%"
        height="12"
      >
        <Controller
          name="query"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={(val) => onChange(val)}
              value={value}
              onSubmitEditing={handleSubmit((data) => {
                onSubmitQuery(data.query);
                reset({
                  query: "",
                });
              })}
              variant="search"
              placeholder={t("searchForAnything")}
              borderRadius="25"
              width="80%"
              backgroundColor={backgroundColor}
              color={color}
              selectionColor={`${color}`}
            />
          )}
        />
        <IconButton
          width="10"
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
