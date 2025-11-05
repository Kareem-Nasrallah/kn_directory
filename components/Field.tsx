"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <div className="size-10 border-4 border-primary border-r-0 border-t-2 rounded-full animate-spin translate-1"></div>
    </div>
  ),
});

interface FieldProps {
  name: string;
  label: string;
  type: "inputText" | "textarea" | "select" | "inputImage" | "pitch";
  options?: { value: string; name: string }[];
  pitch?: string;
  setState?: Dispatch<SetStateAction<string>>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMassage?: string;
  placeholder?: string;
  className?: string;
}

const Field = ({
  name,
  label,
  type,
  options,
  pitch,
  setState,
  onChange,
  errorMassage = "",
  placeholder,
  className,
}: FieldProps) => {
  const fieldType = () => {
    switch (type) {
      case "inputText":
        return (
          <Input
            name={name}
            id={name}
            className="startup-form_input"
            placeholder={placeholder}
            type="text"
          />
        );
      case "inputImage":
        return (
          <Input
            name={name}
            id={name}
            className="startup-form_input"
            placeholder={placeholder}
            type="file"
            accept="image/*"
            onChange={onChange}
          />
        );
      case "textarea":
        return (
          <Textarea
            name={name}
            id={name}
            className="startup-form_textarea focus:outline-0"
            placeholder={placeholder}
          />
        );
      case "select":
        return (
          <Select name={name}>
            <SelectTrigger
              id={name}
              name={name}
              className="startup-form_select"
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="border-2 border-black-100 border-t-0 -top-2 ">
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "pitch":
        return (
          <div data-color-mode="light">
            {setState && (
              <MDEditor
                value={pitch}
                onChange={(value) => setState(value as string)}
                id={name}
                preview="edit"
                height={300}
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  border: "solid 3px",
                  marginTop: "4px",
                }}
                textareaProps={{ placeholder }}
                previewOptions={{ disallowedElements: ["style"] }}
              />
            )}
            <input type="hidden" name={name} value={pitch || ""} />
          </div>
        );
      default:
        throw Error("you put an unexpected type");
    }
  };

  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={name} className="startup-form_label">
        {label}
      </label>
      {fieldType()}
      {errorMassage && <p className="startup-form_error">{errorMassage}</p>}
    </div>
  );
};

export default Field;
