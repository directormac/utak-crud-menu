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
import {
  capitalizeFirstLetter,
  formatCost,
  imagePreviewSrc,
} from "@/lib/utils";
import { OptionTooltip } from "./option-tooltip";
import { ItemDetailsLink } from "./item-details-link";

type Props = {
  item: Item;
  detail?: boolean;
};

export const ItemCard = ({ item }: Props) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="h-1/4">
        <CardTitle>{capitalizeFirstLetter(item.name)}</CardTitle>
        <CardDescription>Category: {item.category}</CardDescription>
      </CardHeader>
      <CardContent className="h-1/2">
        <div className="flex gap-x-2">
          <div className="w-1/2">
            <img
              src={imagePreviewSrc(item.images)}
              alt={item.name}
              height="200px"
              width="200px"
            />
          </div>
          <div className="w-1/2 text-sm">
            {item.options ? (
              <div className="grid grid-cols-2 gap-2">
                {item.options.map((item, index) => (
                  <OptionTooltip key={index} option={item} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col text-left h-full justify-center">
                <p className="text-lg truncate hover:text-clip">
                  Stock: {item.stock}
                </p>
                <p className="text-lg">Cost: {formatCost(item.cost)}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="h-1/4 flex justify-end gap-x-2">
        <ItemDetailsLink id={item.id} />
        <ItemFormDialog update id={item.id} />
        <ItemDeleteDialog id={item.id} name={item.name} />
      </CardFooter>
    </Card>
  );
};
