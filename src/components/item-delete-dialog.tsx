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

type Props = {
  id: string;
  name: string;
};

export const ItemDeleteDialog = ({ id, name }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
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
