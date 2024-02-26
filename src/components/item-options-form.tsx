/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetcherWithComponents } from "react-router-dom";
import { Option } from "@/lib/types";
import { ChangeEvent, FC } from "react";
import { InputField } from "./input-field";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";

type ItemOptionsFormProps = {
  fetcher: FetcherWithComponents<any>;
  options: Array<Option>;
  onOptionChange: (
    index: number,
    fieldName: keyof Option,
    value: string | number,
  ) => void;
  onDeleteOption: (index: number) => void;
};

export const ItemOptionsForm: FC<ItemOptionsFormProps> = ({
  fetcher,
  options,
  onOptionChange,
  onDeleteOption,
}) => {
  const handleOptionNameChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    onOptionChange(index, "name", value);
  };

  const handleOptionCostChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    onOptionChange(index, "cost", Number(value));
  };

  const handleOptionStockChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    onOptionChange(index, "stock", Number(value));
  };

  if (options.length === 0) return <div>No options please add something</div>;

  return (
    <>
      {options.map((option, index) => (
        <div key={index} className="flex text-sm items-center border p-2">
          <div className="flex gap-x-2 items-center">
            <p>{index + 1}.</p>
            <InputField
              label="Name"
              name={`options.${index}.name`}
              value={option.name}
              onChangeValue={(e) => handleOptionNameChange(index, e)}
              hasError={fetcher.data?.errors?.[`options.${index}.name`]}
              error={fetcher.data?.errors?.[`options.${index}.name`]}
              type="text"
            />

            <InputField
              label="Cost"
              name={`options.${index}.cost`}
              value={option.cost}
              onChangeValue={(e) => handleOptionCostChange(index, e)}
              hasError={fetcher.data?.errors?.[`options.${index}.cost`]}
              error={fetcher.data?.errors?.[`options.${index}.cost`]}
              type="number"
            />

            <InputField
              label="Stock"
              name={`options.${index}.stock`}
              value={option.stock}
              onChangeValue={(e) => handleOptionStockChange(index, e)}
              hasError={fetcher.data?.errors?.[`options.${index}.stock`]}
              error={fetcher.data?.errors?.[`options.${index}.stock`]}
              type="number"
            />
          </div>
          <Button
            className="ml-2"
            variant="destructive"
            onClick={(e) => {
              e.preventDefault();
              onDeleteOption(index);
            }}
          >
            <Trash2Icon />
          </Button>
        </div>
      ))}
    </>
  );
};
