import { GetUserById } from "../../../../types/generated";
import { ItemsTableProps } from "../../../organisms/itemsTable/types";

export type UserDetailTemplateProps = Pick<
  ItemsTableProps,
  "itemNavigationHandler"
> & {
  user?: GetUserById;
  isUserFetching: boolean;
  refetchUser: () => void;
};
