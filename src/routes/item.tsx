import { ItemDeleteDialog } from "@/components/item-delete-dialog";
import { ItemFormDialog } from "@/components/item-form-dialog";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useItemQuery } from "@/lib/queries";
import {
  capitalizeFirstLetter,
  formatCost,
  imagePreviewSrc,
} from "@/lib/utils";
import { ArrowLeftCircle } from "lucide-react";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";

export const ItemPage: FC = () => {
  const { id } = useParams() as { id: string };
  const { data: item, isError, isLoading } = useItemQuery(id);

  if (isLoading) return <Spinner />;

  if (item)
    return (
      <div className="flex flex-col">
        <div className="flex">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {capitalizeFirstLetter(item.name)}
          </h1>
          <div className="flex ml-auto gap-x-2">
            <ItemFormDialog update id={item.id} />
            <ItemDeleteDialog id={item.id} name={item.name} />
          </div>
        </div>

        <Separator className="my-4" />
        <div className="flex">
          <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Category:
          </h2>
          <p className="ml-auto text-3xl">{item.category}</p>
        </div>

        <Separator className="my-4" />
        <div className="flex w-full h-full">
          <img src={imagePreviewSrc(item.images)} alt={item.name} />
        </div>

        <Separator className="my-4" />

        {item.options ? (
          <div className="grid grid-cols-2 gap-2">
            {item.options.map((item, index) => (
              <div key={index} className="flex flex-col border p-2 text-lg">
                <p className="font-bold">{item.name}</p>
                <p className="truncate hover:text-clip">
                  <span className="text-muted-foreground">Stock:</span>{" "}
                  {item.stock}
                </p>
                <p>
                  <span className="text-muted-foreground">Cost:</span>{" "}
                  {formatCost(item.cost)}
                </p>
              </div>
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
    );

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">
          Oops! the item with id: {id}, does not exist.
        </h1>
        <Button asChild>
          <Link to="/">
            <ArrowLeftCircle />
            Go back
          </Link>
        </Button>
      </div>
    );
};
