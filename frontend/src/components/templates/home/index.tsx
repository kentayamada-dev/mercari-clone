import { Center } from "native-base";
import React from "react";
import { AppBar } from "../../organisms/appBar";
import { HomeTabs } from "./tabs";
import { HomeTemplateProps } from "./types";

export const HomeTemplate: React.VFC<HomeTemplateProps> = ({
  todoNavigationHandler,
  onSubmitQuery,
  ...itemsTableProps
}) => {
  return (
    <Center flex={1}>
      <AppBar
        onSubmitQuery={onSubmitQuery}
        todoNavigationHandler={todoNavigationHandler}
      />
      <HomeTabs {...itemsTableProps} />
    </Center>
  );
};
