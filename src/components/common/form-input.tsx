import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Skeleton } from "../ui/skeleton";

export default function FormInput<T extends FieldValues>({
  form,
  label,
  name,
  placeholder,
  type = "text",
  disabled = false,
  className,
  description,
  isLoading,
  readOnly = false,
  required,
  onChange,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  description?: string;
  isLoading?: boolean;
  readOnly?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
}) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : type === "textarea" ? (
            <Textarea
              {...field}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              autoComplete="off"
              className="resize-none"
              disabled={disabled}
              readOnly={readOnly}
            />
          ) : (
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete="off"
              type={type}
            />
          )}

          <FieldDescription>{description}</FieldDescription>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
