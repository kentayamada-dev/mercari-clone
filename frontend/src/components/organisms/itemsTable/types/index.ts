import { GetAllItem } from "../../../../types/generated";

export type ItemsTableProps = {
  items?: GetAllItem[];
  itemNavigationHandler: (itemId: string, itemName: string) => void;
};
