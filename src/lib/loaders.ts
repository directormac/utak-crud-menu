import { LoaderFunction } from "react-router-dom";
import { queryClient } from "./utils";
import { itemsQuery } from "./queries";

export const itemsLoader: LoaderFunction = async () => {
  const query = itemsQuery();
  return queryClient.ensureQueryData({ ...query, staleTime: 1000 * 60 });
};
