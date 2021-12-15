import { ItemRead } from "../../../../generated/Api";

export type ItemsTableProps = {
  items: ItemRead[];
  itemNavigationHandler: (itemId: string) => void;
};
