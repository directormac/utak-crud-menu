import { useFetcher } from "react-router-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { GenericResponse, Item, Option } from "@/lib/types";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { useItem } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { Switch } from "./ui/switch";
import { InputField } from "./input-field";
import { ItemOptionsForm } from "./item-options-form";
import { toast } from "sonner";

// type Props = {};
//
// const itemImagesForm: FC<Props> = () => {
//   return (
//     <>
//       <img src="" alt="" />
//     </>
//   );
// };

type ItemFormProps = {
  id?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ItemForm: FC<ItemFormProps> = ({ id, setOpen }) => {
  const currentSelectedItemData = useItem(id ?? "");
  const fetcher = useFetcher();

  const [withOptions, setWithOptions] = useState<boolean>(
    !!currentSelectedItemData?.options?.length &&
      currentSelectedItemData.options[0]?.name !== "default",
  );

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

  const addOptionClickHandler: MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();
    if (itemData.options.length >= 5) {
      toast.warning(`Maximum number of options reached!`);
      return;
    }
    setItemData((previousItemData) => ({
      ...previousItemData,
      options: [...previousItemData.options, { name: "", cost: 0, stock: 0 }],
    }));
  };

  const optionChangeHandler = (
    index: number,
    filedName: keyof Option,
    value: string | number,
  ) => {
    setItemData((previousItemData) => ({
      ...previousItemData,
      options: previousItemData.options.map((option, i) =>
        i === index ? { ...option, [filedName]: value } : option,
      ),
    }));
  };

  const optionDeleteHandler = (index: number) => {
    setItemData((previousItemData) => ({
      ...previousItemData,
      options: previousItemData.options.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    // console.log(fetcher);
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

        <div className="flex items-center ">
          <Switch checked={withOptions} onCheckedChange={setWithOptions} />
          <span
            className={cn(
              "ml-2 text-sm",
              withOptions ? "text-green-500" : "text-gray-500",
            )}
          >
            {withOptions ? "With" : "Without"} options
          </span>
        </div>
        {!withOptions && (
          <>
            <div className="flex flex-col space-y-2">
              <Label>Cost</Label>
              <Input
                name="cost"
                type="number"
                className={cn(
                  fetcher.data?.errors?.cost ? "border-red-500" : "",
                )}
                value={itemData.cost}
                onChange={(e) =>
                  setItemData({ ...itemData, cost: Number(e.target.value) })
                }
                placeholder="10"
              />
              {fetcher.data?.errors?.cost && (
                <p className="text-red-500 text-sm">
                  {fetcher.data.errors.cost}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Stock</Label>
              <Input
                name="stock"
                type="number"
                className={cn(
                  fetcher.data?.errors?.stock ? "border-red-500" : "",
                )}
                value={itemData.stock}
                onChange={(e) =>
                  setItemData({ ...itemData, stock: Number(e.target.value) })
                }
                placeholder="20"
              />
              {fetcher.data?.errors?.stock && (
                <p className="text-red-500 text-sm">
                  {fetcher.data.errors.stock}
                </p>
              )}
            </div>
          </>
        )}
        {withOptions && (
          <>
            <ItemOptionsForm
              fetcher={fetcher}
              options={itemData.options}
              onOptionChange={optionChangeHandler}
              onDeleteOption={optionDeleteHandler}
            />
            <Button
              variant="secondary"
              className="ml-auto mr-4"
              onClick={addOptionClickHandler}
            >
              Add Option
            </Button>
          </>
        )}
        <Button
          type="submit"
          variant="default"
          disabled={
            fetcher.state === "submitting" || fetcher.state === "loading"
          }
        >
          {currentSelectedItemData ? "Update" : "Create"} Item
        </Button>
      </fetcher.Form>
    </div>
  );
};
