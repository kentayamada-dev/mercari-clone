import { Center } from "native-base";
import React from "react";
import { AppBar } from "../../organisms/appBar";
import { HomeTabs } from "./tabs";
import { HomeTemplateProps } from "./types";

export const HomeTemplate: React.VFC<HomeTemplateProps> = ({
  todoNavigationHandler,
  ...itemsTableProps
}) => {
  return (
    <Center height="full">
      <AppBar todoNavigationHandler={todoNavigationHandler} />
      <HomeTabs {...itemsTableProps} />
    </Center>
  );
};