import { Item } from "@/lib/types";
import { ItemCard } from "./item-card";
import { Separator } from "./ui/separator";

type Props = {
  items: Array<Item>;
};

export const ItemsGrid = ({ items }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="py-4 flex items-center text-center justify-between">
        <h1 className="scroll-m-20  font-bold tracking-tight md:text-2xl">
          Items
        </h1>
        <p className="text-xl md:ml-2 text-center">
          Displayed Items:<span className="font-bold ml-2">{items.length}</span>
        </p>
      </div>

      <Separator className="my-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
        {items && items.map((item) => <ItemCard key={item.id} item={item} />)}
      </div>
    </div>
  );
};
