import { ItemRead } from "../../../../../../types/generated";
import { ItemsTableProps } from "../../../../../organisms/itemsTable/types";

export type RecommendTabProps = Pick<
  ItemsTableProps,
  "itemNavigationHandler"
> & {
  items?: ItemRead[];
  isItemsFetching: boolean;
  refetchItems: () => void;
};
