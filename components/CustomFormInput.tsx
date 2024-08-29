import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/utils";
import { Control, FieldPath, Form } from "react-hook-form";
import { z } from "zod";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { parse, format } from "date-fns";

const formSchema = authFormSchema("sign-up");

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

export const CustomFormInput = ({
  control,
  name,
  label,
  placeholder,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class dark-bg dark-border placeholder:text-neutral-400"
                type={name === "password" ? "password" : "text"}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export const CustomDateInput = ({
  control,
  name,
  label,
  placeholder,
}: CustomInputProps) => {
  const [date, setDate] = React.useState<string>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item flex-1">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left text-16 dark-bg dark:text-neutral-400 dark-border text-gray-500 rounded-lg border border-gray-300",
                    !date && "text-gray-500 dark-p"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 dark-p" />
                  {date ? (
                    format(parse(date, "yyyy-MM-dd", new Date()), "PPP")
                  ) : (
                    <span className="text-gray-500 dark-p">{placeholder}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 dark-border" align="start">
                <Calendar
                  mode="single"
                  captionLayout="dropdown-buttons"
                  fromYear={1960}
                  toYear={new Date().getFullYear()}
                  selected={
                    date
                      ? parse(date, "yyyy-MM-dd", new Date())
                      : new Date()
                  }
                  onSelect={(selectedDate) => {
                    const formattedDate = format(selectedDate!, "yyyy-MM-dd");
                    setDate(formattedDate);
                    field.onChange(formattedDate);
                  }}
                  initialFocus
                  disabled={false}
                  className="bg-white dark-p text-gray-500 dark-bg"
                />
              </PopoverContent>
            </Popover>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};
