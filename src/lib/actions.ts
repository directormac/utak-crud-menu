import { ActionFunction } from "react-router-dom";
import { GenericResponse, Item, itemSchema } from "./types";
import { removeItem, upsertItem } from "./firebase";
import { toast } from "sonner";
import { decode } from "decode-formdata";
import { customAlphabet } from "nanoid";
import { queryClient } from "./utils";

export const itemAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const formValues = decode(formData, {
    arrays: ["images", "options"],
    files: ["images.$.file"],
    numbers: ["cost", "stock", "options.$.cost", "options.$.stock"],
  });

  const message: GenericResponse = {
    body: "Something went wrong, Please try again later",
    errors: {},
  };

  const toastErorrs = (errors: Record<string, string[]>) => {
    for (const key in errors) {
      toast.error(`${key}: ${errors[key]}`);
    }
  };

  switch (request.method) {
    case "POST": {
      const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 13);

      const itemData = itemSchema.safeParse({
        ...formValues,
        id: nanoid(),
      });

      if (!itemData.success) {
        const invalidFields = itemData.error.flatten().fieldErrors as Record<
          string,
          string[]
        >;
        toastErorrs(invalidFields);
        message.errors = invalidFields;
        return message;
      }

      const newItem = itemData.data;

      if (newItem.images.length === 0) newItem.images = ["default.png"];

      const items = queryClient.getQueryData<Array<Item>>(["items"]);

      const alreadyExists = items?.some((item) => item.name === newItem.name);

      if (alreadyExists) {
        message.body = `Item with ${newItem.name} already exists, You might want to add a variant`;
        toast.error(message.body);
        return message;
      }
      const result = await upsertItem(newItem.id, newItem);
      if (result) {
        queryClient.invalidateQueries({ queryKey: ["items"] });
        message.body = `Successfully created ${newItem.name}`;
        toast.success(message.body);
        return message;
      }
      return message;
    }
    case "PUT": {
      const itemData = itemSchema.safeParse({
        ...formValues,
        id: formValues.id,
      });

      if (!itemData.success) {
        const invalidFields = itemData.error.flatten().fieldErrors;
        toastErorrs(invalidFields);
        message.errors = invalidFields;
        return message;
      }

      const result = await upsertItem(itemData.data.id, itemData.data);

      if (result) {
        queryClient.invalidateQueries({ queryKey: ["items"] });
        message.body = `Successfully updated item with id ${formValues.id}`;
        toast.success(message.body);
      }
      return message;
    }
    case "DELETE": {
      const { id } = formValues;
      const result = await removeItem(id as string);
      if (result) {
        queryClient.invalidateQueries({ queryKey: ["items"] });
        toast.success(`Successfully removed item with id ${id}`);
      }
      return message;
    }
    default:
      return message;
  }
};
