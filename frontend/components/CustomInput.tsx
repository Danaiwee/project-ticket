import { Control, FieldPath, FieldValues } from "react-hook-form";

import { FormField, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  type?: string;
}

const CustomInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: CustomInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <FormLabel>{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="text-[14px] placeholder:text-[14px] rounded-lg border border-gray-300 text-gray-700 font-semibold placeholder:text-gray-500 h-12"
                type={type}
                id={name}
                {...field}
              />
            </FormControl>
            <FormMessage className="text-[12px] text-red-500 mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
