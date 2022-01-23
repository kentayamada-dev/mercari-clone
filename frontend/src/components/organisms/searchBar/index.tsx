import { Box, IconButton, Input } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  typedUseColorModeValue,
  typedUseColorToken,
} from "../../../theme/modules";
import { SearchBarProps } from "./types";
import { AntDesign } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";

export const SearchBar: React.VFC<SearchBarProps> = React.memo<SearchBarProps>(
  ({ setQuery, goBackNavigationHandler, query }) => {
    const color = typedUseColorToken(
      "brand.secondary.dark",
      "brand.secondary.light"
    );

    const backgroundColor = typedUseColorModeValue(
      "brand.quaternary.light",
      "brand.quaternary.dark"
    );
    const { t } = useTranslation("home");

    const { control, handleSubmit } = useForm<{ query: string }>({
      defaultValues: {
        query,
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
        <IconButton
          width="10%"
          onPress={goBackNavigationHandler}
          padding="0"
          justifyContent="center"
          alignItems="center"
          icon={<AntDesign name="arrowleft" size={25} color={`${color}`} />}
          _pressed={{
            bg: backgroundColor,
          }}
        />
        <Controller
          name="query"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={(val) => onChange(val)}
              value={value}
              onSubmitEditing={handleSubmit((data) => setQuery(data.query))}
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
      </Box>
    );
  }
);
