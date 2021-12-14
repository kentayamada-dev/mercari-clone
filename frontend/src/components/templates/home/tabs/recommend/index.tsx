import { Center } from "native-base";
import React from "react";
import { Item } from "../../../../../generated/Api";
import { ItemsTable } from "../../../../organisms/itemsTable";

type Props = {
  items: Item[];
  itemNavigationHandler: (itemId: string) => void;
};

export const RecommendTab: React.VFC<Props> = ({ ...itemsTableProps }) => {
  return (
    <Center height="full">
      <ItemsTable {...itemsTableProps} />
    </Center>
  );
};
