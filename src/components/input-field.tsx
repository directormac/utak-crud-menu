/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type InputFieldProps = {
  label: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  hasError?: boolean;
  error?: string;
  className?: string;
  value: string | number;
  onChangeValue: React.Dispatch<React.SetStateAction<any>>;
  placeholder?: string;
  required?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  hasError,
  error,
  value,
  placeholder,
  className,
  onChangeValue,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        name={name}
        type={type}
        className={cn(hasError ? "border-red-500" : "", className)}
        value={value}
        onChange={onChangeValue}
        placeholder={placeholder}
        required
      />
      {hasError && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
