import { FC, MouseEventHandler, useEffect, useState } from "react";
import { Fetcher } from "react-router-dom";
import { Item, Option } from "@/lib/types";
import { Switch } from "./ui/switch";
import { cn } from "@/lib/utils";
import { InputField } from "./input-field";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { ItemWithOptionsField } from "./item-with-options-field";

type Props = {
  fetcher: Fetcher;
  itemData: Item;
  setItemData: React.Dispatch<React.SetStateAction<Item>>;
  setDisableSubmit: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ItemOptionsFields: FC<Props> = ({
  fetcher,
  itemData,
  setItemData,
  setDisableSubmit,
}) => {
  const [withOptions, setWithOptions] = useState<boolean>(
    itemData.options && itemData.options.length > 0,
  );

  const optionCheckChangeOptionHandler = (withOption: boolean) => {
    setWithOptions(withOption);

    if (withOption) {
      setItemData((previousItemData) => ({
        ...previousItemData,
        cost: 0,
        stock: 0,
        options: [
          { name: "Option 1", cost: itemData.cost, stock: itemData.stock },
          { name: "Option 2", cost: 0, stock: 0 },
        ],
      }));
    } else {
      setItemData((previousItemData) => ({
        ...previousItemData,
        cost: itemData.options[0].cost,
        stock: itemData.options[0].stock,
        options: [],
      }));
    }
  };

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
      options: [
        ...previousItemData.options,
        {
          name: `Option ${previousItemData?.options?.length + 1}`,
          cost: 0,
          stock: 0,
        },
      ],
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
    if (itemData.options) {
      if (itemData.options.length === 1 && withOptions) setDisableSubmit(true);
    }
    setDisableSubmit(false);
  }, [itemData, setDisableSubmit, withOptions]);

  return (
    <>
      <div className="flex items-center ">
        <Switch
          checked={withOptions}
          onCheckedChange={optionCheckChangeOptionHandler}
        />
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
          <InputField
            label="Cost"
            value={itemData.cost}
            hasError={fetcher?.data?.errors?.cost}
            onChangeValue={(e) =>
              setItemData({ ...itemData, cost: Number(e.target.value) })
            }
            error={fetcher?.data?.errors?.cost}
            name="cost"
            type="number"
            min=""
          />

          <InputField
            label="Stock"
            value={itemData.stock}
            hasError={fetcher?.data?.errors?.stock}
            onChangeValue={(e) =>
              setItemData({ ...itemData, stock: Number(e.target.value) })
            }
            error={fetcher?.data?.errors?.stock}
            name="stock"
            type="number"
            min="0"
          />
        </>
      )}
      {withOptions && (
        <>
          <ItemWithOptionsField
            options={itemData.options}
            onOptionChange={optionChangeHandler}
            onDeleteOption={optionDeleteHandler}
          />

          {itemData.options.length === 1 && (
            <p className="text-md text-orange-300">
              Minimum of 2 options are required.
            </p>
          )}

          <Button
            variant="secondary"
            className="ml-auto mr-4"
            onClick={addOptionClickHandler}
            disabled={itemData.options.length === 5}
          >
            Add Option
          </Button>
        </>
      )}
    </>
  );
};
