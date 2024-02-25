import { Item } from "@/lib/types";
import { ItemCard } from "./item-card";

type Props = {
  items: Array<Item>;
};

export const ItemsGrid = ({ items }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="py-4 flex items-center text-center justify-between md:justify-normal">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          Items
        </h1>
        <p className="text-2xl md:ml-2 text-center">
          Total:<span className="font-bold ml-2">{items.length}</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
        {items && items.map((item) => <ItemCard key={item.id} item={item} />)}
      </div>
    </div>
  );
};
