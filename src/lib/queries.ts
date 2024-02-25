import { useQuery } from "@tanstack/react-query";
import { getItems } from "./firebase";

export const itemsQuery = () => ({
  queryKey: ["items"],
  queryFn: async () => getItems(),
});

export const useItemsQuery = () => useQuery(itemsQuery());

export const useItem = (id: string) =>
  useItemsQuery().data?.find((item) => item.id === id);

export const useItemCount = () => useItemsQuery().data?.length;

export const useItemCategories = () =>
  useItemsQuery().data?.map((item) => item.category);
