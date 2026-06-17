import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import { Switch } from "../ui/switch";

export default function FormSwitch<T extends FieldValues>({
  form,
  label,
  name,
  disabled = false,
  className,
  isLoading,
  readOnly = false,
  required,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  readOnly?: boolean;
  required?: boolean;
}) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          </FieldContent>
          <Switch id={field.name} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
