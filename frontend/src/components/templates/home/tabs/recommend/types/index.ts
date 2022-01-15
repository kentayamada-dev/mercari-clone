import { InfiniteData } from "react-query";
import { ReadItems } from "../../../../../../types/generated";
import { ItemsTableProps } from "../../../../../organisms/itemsTable/types";

export type RecommendTabProps = Pick<ItemsTableProps, "itemNavigationHandler"> & {
  items?: InfiniteData<ReadItems>;
  isItemsRefetching: boolean;
  isNextItemsFetching: boolean;
  onRefetchItems: () => void;
  onFetchNextItems: () => void;
};
