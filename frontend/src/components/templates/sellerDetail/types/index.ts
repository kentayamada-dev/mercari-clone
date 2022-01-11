import { SellerRead } from "../../../../types/generated";
import { ItemsTableProps } from "../../../organisms/itemsTable/types";

export type SellerDetailTemplateProps = Pick<
  ItemsTableProps,
  "itemNavigationHandler"
> & {
  seller?: SellerRead;
  isSellerFetching: boolean;
  refetchSeller: () => void;
};
