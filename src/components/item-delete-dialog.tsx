import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  name: string;
};

export const ItemDeleteDialog = ({ id, name }: Props) => {
  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <>
            {isDesktop && (
              <span className={cn(!isDesktop && "sr-only", "mr-2")}>
                Delete
              </span>
            )}
            <Trash className="h-4 w-4" />
          </>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {name && ""}?
          </DialogDescription>
        </DialogHeader>
        <Form method="delete">
          <Input className="hidden" value={id} name="id" onChange={() => {}} />
          <Button className="w-full" type="submit" variant="destructive">
            Yes
          </Button>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="w-full" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
