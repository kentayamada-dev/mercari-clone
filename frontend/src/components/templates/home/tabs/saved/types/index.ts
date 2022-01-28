import { InfiniteData } from "react-query";
import { ReadQueries } from "../../../../../../types/generated";

export type SavedTabProps = {
  savedQueries?: InfiniteData<ReadQueries>;
  isSavedQueriesRefetching: boolean;
  isNextSavedQueriesFetching: boolean;
  onFetchNextSavedQueries: () => void;
  onRefetchSavedQueries: () => void;
  savedQueriesNavigationHandler: (savedQuery: string) => void;
};
