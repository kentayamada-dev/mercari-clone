import { Item } from "../../../../../../generated/Api";
import { ItemsTableProps } from "../../../../../organisms/itemsTable/types";

export type RecommendTabProps = Pick<
  ItemsTableProps,
  "itemNavigationHandler"
> & {
  items?: Item[];
  isItemsFetching: boolean;
  refetchItems: () => void;
};
