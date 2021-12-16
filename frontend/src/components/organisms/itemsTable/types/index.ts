import { ItemRead } from "../../../../types/generated";

export type ItemsTableProps = {
  items: ItemRead[];
  itemNavigationHandler: (itemId: string) => void;
};
