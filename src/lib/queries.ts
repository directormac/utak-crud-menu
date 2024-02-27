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

export const useItem = (id: string) =>
  useItemsQuery().data?.find((item) => item.id === id);

export const useFilteredItemsQuery = (filter: string = "") => {
  return useItemsQuery().data?.filter(
    (item) =>
      filter === "" ||
      item.category.includes(filter) ||
      item.name.includes(filter) ||
      item.options.map((option) => option.name.includes(filter)),
  );
};
export const useItemCount = () => useItemsQuery().data?.length;

export const useItemCategories = () =>
  useItemsQuery().data?.map((item) => item.category);
