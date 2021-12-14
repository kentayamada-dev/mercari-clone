import { Center } from "native-base";
import React from "react";
import { Item } from "../../../generated/Api";
import { AppBar } from "../../organisms/appBar";
import { HomeTabs } from "./tabs";

type Props = {
  isItemsFetching: boolean;
  items: Item[];
  itemNavigationHandler: (itemId: string) => void;
  refetchItems: () => void;
  todoNavigationHandler: () => void;
};

export const HomeTemplate: React.VFC<Props> = ({
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
