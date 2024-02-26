import { useQuery } from "@tanstack/react-query";
import { getItem, getItems } from "./firebase";

export const itemsQuery = () => ({
  queryKey: ["items"],
  queryFn: async () => getItems(),
});

export const itemQuery = (id: string) => ({
  queryKey: ["item", id],
  queryFn: async () => getItem(id),
});

export const useItemsQuery = () => useQuery(itemsQuery());

export const useItemQuery = (id: string) => useQuery(itemQuery(id));

export const useItem = (id: string) => useQuery(itemQuery(id));

export const useItemCount = () => useItemsQuery().data?.length;

export const useItemCategories = () =>
  useItemsQuery().data?.map((item) => item.category);
