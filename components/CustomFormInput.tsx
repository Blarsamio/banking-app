import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/utils";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";


interface CustomFormProps {
  control: Control<z.infer<typeof authFormSchema>>;
  name: FieldPath<z.infer<typeof authFormSchema>>;
  label: string;
  placeholder: string;
}

const CustomFormInput = ({ control, name, label, placeholder }: CustomFormProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col"></div>
          <FormControl>
            <Input
              type={name === "password" ? "password" : "text"}
              placeholder={placeholder}
              className="input-class"
              {...field}
            />
          </FormControl>
          <FormMessage className="form-message" {...field} />
        </div>
      )}
    />
  );
};

export default CustomFormInput;
