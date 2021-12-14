import { Ionicons } from "@expo/vector-icons";
import { Box, IconButton, Input, useColorMode } from "native-base";
import React from "react";

type Props = {
  todoNavigationHandler: () => void;
};

export const AppBar: React.VFC<Props> = React.memo<Props>(
  ({ todoNavigationHandler }) => {
    const { colorMode } = useColorMode();

    return (
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        p="2"
        width="100%"
      >
        <Input
          variant="search"
          placeholder="なにをお探しですか?"
          borderRadius="25"
          width="80%"
          _light={{
            bg: "muted.200",
            color: "black",
            selectionColor: "black",
          }}
          _dark={{
            bg: "muted.700",
            color: "white",
            selectionColor: "white",
          }}
        />
        <IconButton
          width="10%"
          onPress={todoNavigationHandler}
          padding="0"
          justifyContent="center"
          alignItems="center"
          colorScheme="muted"
          icon={
            <Ionicons
              name="checkmark"
              size={30}
              color={colorMode === "dark" ? "white" : "black"}
            />
          }
        />
      </Box>
    );
  }
);
