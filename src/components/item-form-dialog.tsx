import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { ItemForm } from "./item-form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { DialogClose } from "@radix-ui/react-dialog";
import { FilePenLine, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  update?: boolean;
  id?: string;
};

export const ItemFormDialog = ({ update = false, id }: Props) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const actionButton = (
    <Button
      variant={update ? "default" : "outline"}
      className={cn(
        update
          ? "bg-cyan-500 dark:bg-cyan-500"
          : "bg-green-500 dark:bg-green-700",
      )}
    >
      {update ? (
        <>
          {isDesktop && (
            <span className={cn(!isDesktop && "sr-only", "mr-2")}>Update</span>
          )}
          <FilePenLine className="h-4 w-4" />
        </>
      ) : (
        <>
          {isDesktop && (
            <span className={cn(!isDesktop && "sr-only", "mr-2")}>
              Create Item
            </span>
          )}
          <PlusIcon className="h-4 w-4" />
        </>
      )}
    </Button>
  );

  const title = update ? "Update" : "Create" + "Item";

  const description = update
    ? "Make changes to your item and save"
    : "Add a new item to your inventory";

  const cancelButton = (
    <Button variant="secondary" className="w-full">
      Cancel
    </Button>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{actionButton}</DialogTrigger>
        <DialogContent className="w-full max-w-3xl p-8">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <ItemForm id={id ?? ""} setOpen={setOpen} />
          <DialogFooter>
            <DialogClose asChild>{cancelButton}</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{actionButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <ItemForm id={id ?? ""} setOpen={setOpen} />
        <DrawerFooter>
          <DrawerClose asChild>{cancelButton}</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
