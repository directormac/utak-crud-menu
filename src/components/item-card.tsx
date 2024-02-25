import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Item } from "@/lib/types";
import { ItemFormDialog } from "./item-form-dialog";
import { ItemDeleteDialog } from "./item-delete-dialog";
import { imagePreviewSrc } from "@/lib/utils";

type Props = {
  item: Item;
};

export const ItemCard = ({ item }: Props) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="h-1/4">
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>Category: {item.category}</CardDescription>
      </CardHeader>
      <CardContent className="h-1/2">
        <div className="flex gap-x-2">
          <div className="w-1/2">
            <img src={imagePreviewSrc(item.images)} alt={item.name} />
          </div>

          <div className="w-1/2 text-sm">
            {item.options && item.options[0].name !== "default" ? (
              item.options.map((item) => (
                <div className="border p-1">
                  <p>Name: {item.name}</p>
                  <p>Stock: {item.stock}</p>
                  <p>Cost: {item.cost}</p>
                </div>
              ))
            ) : (
              <>
                <p className="text-xl">Stock: {item.stock}</p>
                <p className="text-xl">Cost: {item.cost}</p>
              </>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="h-1/4 flex justify-between">
        <ItemFormDialog update id={item.id} />
        <ItemDeleteDialog id={item.id} name={item.name} />
      </CardFooter>
    </Card>
  );
};
