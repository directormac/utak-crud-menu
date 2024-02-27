import { Option } from "@/lib/types";
import { ChangeEvent, FC } from "react";
import { InputField } from "./input-field";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";

type ItemWithOptionsFieldProps = {
  options: Array<Option>;
  onOptionChange: (
    index: number,
    fieldName: keyof Option,
    value: string | number,
  ) => void;
  onDeleteOption: (index: number) => void;
};

export const ItemWithOptionsField: FC<ItemWithOptionsFieldProps> = ({
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
    onOptionChange(index, "cost", value);
  };

  const handleOptionStockChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    onOptionChange(index, "stock", value);
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
              type="text"
              required
            />

            <InputField
              label="Cost"
              name={`options.${index}.cost`}
              value={option.cost}
              onChangeValue={(e) => handleOptionCostChange(index, e)}
              type="number"
            />

            <InputField
              label="Stock"
              name={`options.${index}.stock`}
              value={option.stock}
              onChangeValue={(e) => handleOptionStockChange(index, e)}
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
            disabled={index === 0 || index === 1}
          >
            <Trash2Icon />
          </Button>
        </div>
      ))}
    </>
  );
};
