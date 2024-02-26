import { LoaderFunction, redirect } from "react-router-dom";
import { queryClient } from "./utils";
import { itemQuery, itemsQuery } from "./queries";

export const itemsLoader: LoaderFunction = async () => {
  const query = itemsQuery();
  return queryClient.ensureQueryData({ ...query, staleTime: 1000 * 60 });
};

export const itemLoader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  if (!id) {
    return redirect("/");
  }

  const query = itemQuery(id);
  return queryClient.ensureQueryData({ ...query, staleTime: 1000 * 60 });
};
