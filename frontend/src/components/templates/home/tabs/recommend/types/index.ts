import { ItemsTableProps } from "../../../../../organisms/itemsTable/types";

export type RecommendTabProps = ItemsTableProps & {
  isItemsFetching: boolean;
  refetchItems: () => void;
};
