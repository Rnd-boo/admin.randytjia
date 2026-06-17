import FormInput from "@/components/common/form-input";
import FormSwitch from "@/components/common/form-switch";
import { Card, CardContent } from "@/components/ui/card";
import { BookForm } from "@/validations/books.validation";
import { UseFormReturn } from "react-hook-form";

export default function FormCardBook({
  form,
}: {
  form: UseFormReturn<BookForm>;
}) {
  return (
    <div className=" w-full">
      <div className="grid grid-cols-5 gap-4 mb-4">
        <Card className="col-span-4">
          <CardContent>
            <div className="flex gap-2">
              <FormInput form={form} label="Book Name" name="name" />
              <FormInput form={form} label="Author" name="author" />
            </div>
            <div className="flex gap-2">
              <FormInput form={form} label="Book Cover" name="image" />
              <div className="w-1/2">
                <FormInput form={form} label="Subject" name="subject" />
                <FormInput form={form} label="Year" name="year" type="number" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full h-fit">
          <CardContent>
            <FormSwitch
              form={form}
              label="Star"
              name="star"
              className="h-fit flex"
            />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="w-full">
          <FormInput
            form={form}
            label="Description"
            name="description"
            type="textarea"
          />
        </CardContent>
      </Card>
    </div>
  );
}
