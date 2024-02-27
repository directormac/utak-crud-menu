import { Item } from "@/lib/types";
import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { capitalizeFirstLetter } from "@/lib/utils";
import { OptionCard } from "./option-card";
import { Separator } from "./ui/separator";
import { useMediaQuery } from "usehooks-ts";
import { ItemMutationActions } from "./item-mutation-dropdown";

type Props = {
  items: Array<Item>;
};

export const ItemsTable: FC<Props> = ({ items }) => {
  const largeScreen = useMediaQuery("(min-width: 560px)");

  return (
    <>
      <div className="py-4 flex items-center text-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          Items
        </h1>
        <p className="text-2xl md:ml-2 text-center">
          Displayed Items:<span className="font-bold ml-2">{items.length}</span>
        </p>
      </div>
      <Separator />
      <Table className="justify-center items-center text-sm md:text-lg md:w-full">
        <TableHeader className="font-bold">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            {largeScreen && <TableHead>Details</TableHead>}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-ellipsis">
                {capitalizeFirstLetter(item.name)}
              </TableCell>
              <TableCell className="text-ellipsis">
                {capitalizeFirstLetter(item.category)}
              </TableCell>
              {largeScreen && (
                <TableCell>
                  {item.options ? (
                    item.options.map((option, index) => (
                      <span className="pb-1">
                        <OptionCard key={index} option={option} />
                      </span>
                    ))
                  ) : (
                    <span>
                      Cost: {item.cost} Stock: {item.stock}
                    </span>
                  )}
                </TableCell>
              )}
              <TableCell className="flex gap-x-1">
                <ItemMutationActions
                  withDetials
                  id={item.id}
                  name={item.name}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
