import { useFetcher } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { GenericResponse, Item } from "@/lib/types";
import { FC, useEffect, useState } from "react";
import { useItem } from "@/lib/queries";
import { InputField } from "./input-field";
import { ItemOptionsFields } from "./item-options-fields";

type ItemFormProps = {
  id?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ItemForm: FC<ItemFormProps> = ({ id, setOpen }) => {
  const currentSelectedItemData = useItem(id ?? "");
  const fetcher = useFetcher();

  const [itemData, setItemData] = useState<Item>(
    currentSelectedItemData || {
      id: "",
      name: "",
      cost: 0,
      stock: 0,
      category: "default",
      images: [],
      options: [],
    },
  );

  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (fetcher.data) {
      const response = fetcher.data as GenericResponse | undefined;
      const success =
        response?.body.includes("created") ||
        response?.body.includes("updated");
      if (success) setOpen(false);
    }
  }, [fetcher, setOpen]);

  useEffect(() => {
    if (currentSelectedItemData) setItemData({ ...currentSelectedItemData });
  }, [setItemData, currentSelectedItemData]);

  useEffect(() => {
    if (fetcher.state === "submitting" || fetcher.state === "loading") {
      setDisableSubmit(true);
    }
  }, [fetcher]);

  return (
    <div className="flex flex-col gap-y-4 mx-4 md:mx-1">
      <fetcher.Form
        method={currentSelectedItemData !== undefined ? "put" : "post"}
        className="flex flex-col space-y-4"
      >
        {currentSelectedItemData && (
          <Input
            className="hidden"
            type="text"
            name="id"
            value={currentSelectedItemData.id}
            onChange={(e) => setItemData({ ...itemData, id: e.target.value })}
          />
        )}
        <InputField
          label="Name"
          value={itemData.name}
          hasError={fetcher?.data?.errors?.name}
          onChangeValue={(e) =>
            setItemData({ ...itemData, name: e.target.value })
          }
          error={fetcher?.data?.errors?.name}
          name="name"
          type="text"
          required
        />
        <InputField
          label="Category"
          value={itemData.category}
          hasError={fetcher?.data?.errors?.category}
          onChangeValue={(e) =>
            setItemData({ ...itemData, category: e.target.value })
          }
          error={fetcher?.data?.errors?.category}
          name="category"
          type="text"
        />

        <ItemOptionsFields
          setItemData={setItemData}
          setDisableSubmit={setDisableSubmit}
          itemData={itemData}
          fetcher={fetcher}
        />

        <Button type="submit" variant="default" disabled={disableSubmit}>
          {currentSelectedItemData ? "Update" : "Create"} Item
        </Button>
      </fetcher.Form>
    </div>
  );
};
