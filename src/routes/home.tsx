import { ItemsGrid } from "@/components/items-grid";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { itemsQuery } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search } from "lucide-react";
import { useDebounceCallback } from "usehooks-ts";
import { ItemsTable } from "@/components/items-table";
import { Separator } from "@/components/ui/separator";
import { ViewToggle } from "@/components/view-toggle";

export const Home = () => {
  const { data, isLoading } = useQuery(itemsQuery());
  const [filter, setFilter] = useState<string>("");
  const debounced = useDebounceCallback(setFilter, 250);
  const [pageView, setPageView] = useState<"grid" | "table">("grid");

  const filteredData =
    filter === ""
      ? data
      : data?.filter((item) => {
          const normalizedFilter = filter.toLowerCase();
          return (
            item.name.toLowerCase().includes(normalizedFilter) ||
            item.category.toLowerCase().includes(normalizedFilter)
          );
        });

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="inline-flex gap-x-2 items-center relative w-1/2">
          <span className="absolute right-1">
            <Search />
          </span>
          <Input
            type="search"
            defaultValue={filter}
            onChange={(event) => debounced(event.target.value)}
            placeholder="Search"
          />
        </div>
        <div className="ml-auto">
          <ViewToggle setPageView={setPageView} pageView={pageView} />
        </div>
        <p className="text-xs md:text-lg md:ml-2 text-center">
          <span>Total:</span>
          <span className="font-bold ml-2">{data && data.length}</span>
        </p>
      </div>

      <Separator className="my-4" />
      {filteredData ? (
        pageView === "grid" ? (
          <ItemsGrid items={filteredData} />
        ) : (
          <ItemsTable items={filteredData} />
        )
      ) : (
        <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">
            What you are looking for doesn't exist!
          </h1>
        </div>
      )}
    </>
  );
};
