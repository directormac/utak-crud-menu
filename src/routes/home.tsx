import { ItemsGrid } from "@/components/items-grid";
import { Spinner } from "@/components/spinner";
import { itemsQuery } from "@/lib/queries";
import { Item } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const Home = () => {
  const { data: items, isLoading } = useQuery(itemsQuery());

  if (isLoading) return <Spinner />;

  return (
    <>
      <ItemsGrid items={items as Array<Item>} />
    </>
  );
};
