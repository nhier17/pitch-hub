import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Control } from "react-hook-form";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  MDEDITOR = "mdeditor",
}

interface CustomProps {
  control: Control<unknown>;
  name: string;
  label?: string;
  placeholder?: string;
  fieldType: FormFieldType;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input placeholder={props.placeholder} {...field} className="start-form_input" />
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea placeholder={props.placeholder} {...field} className="start-form_textarea" />
        </FormControl>
      );
    case FormFieldType.MDEDITOR:
      return (
        <FormControl>
          <MDEditor
            value={field.value || ""}
            onChange={(value) => field.onChange(value || "")}
            preview="edit"
            height={300}
            style={{ borderRadius: 20, overflow: "hidden" }}
            textareaProps={{
              placeholder: props.placeholder,
            }}
            previewOptions={{ disallowedElements: ["style"] }}
          />
        </FormControl>
      );
    default:
      return null;
  }
};

const CustomInput = (props: CustomProps) => {
  const { control, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="startup-form_label">{label}</FormLabel>
          <RenderField field={field} props={props} />
          <FormMessage className="startup-form_error" />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
