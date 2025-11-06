"use client";

import React, { useActionState, useState } from "react";
import Field from "./Field";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { newStartupSchema } from "@/lib/validation";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";
import { Skeleton } from "./ui/skeleton";

const StartupForm = () => {
  const router = useRouter();

  const [errors, setErrors] = useState({
    title: [""],
    description: [""],
    category: [""],
    image: [""],
    pitch: [""],
  });

  const [imageBase64, setImageBase64] = useState("");
  const [pitch, setPitch] = useState<string>("");

  const categoriesOptions: { value: string; name: string }[] = [
    { name: "Tech", value: "tech" },
    { name: "Health", value: "health" },
    { name: "Education", value: "education" },
    { name: "Fintech", value: "fintech" },
    { name: "Agtech", value: "agtech" },
    { name: "Security", value: "security" },
    { name: "Food", value: "food" },
    { name: "Biotech", value: "biotech" },
  ];

  const hundelForm = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        image: formData.get("image") as string,
        pitch: formData.get("pitch") as string,
      };

      await newStartupSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status === "SUCSSES") {
        toast.success("Success", {
          description: "Your startuup pitch has been created successfully",
        });
        console.log(result._id);
        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as any);

        toast.error("Error", {
          description: "Please check your inputs and try again",
        });

        return { ...prevState, error: "Validation failed", status: "Error" };
      }
      toast.error("Error", {
        description: "An unexpected error has occurred",
      });
      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(hundelForm, {
    errors: "",
    status: "INITIAL",
  });

  return (
      <form action={formAction} className="startup-form">
        <div>
          <Field
            type="inputText"
            name="title"
            label="Title"
            placeholder="Startup Title"
            errorMassage={errors.title[0]}
          />

          <Field
            type="textarea"
            name="description"
            label="Description"
            placeholder="Startup Category"
            errorMassage={errors.description[0]}
          />

          <Field
            type="select"
            options={categoriesOptions}
            name="category"
            label="Category"
            placeholder="Select the Startup Category"
            errorMassage={errors.category[0]}
          />

          <Field
            type="inputImage"
            name="file"
            label="Image URL"
            placeholder="Startup Image URL"
            errorMassage={errors.image[0]}
            onChange={(e) => {
              const image = e.currentTarget.files?.[0];
              if (image) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64 = reader.result as string;
                  setImageBase64(base64);
                };
                reader.readAsDataURL(image);
              }
            }}
          />
          <input type="hidden" name="image" value={imageBase64} />

          <Field
            type="pitch"
            pitch={pitch}
            setState={setPitch}
            name="pitch"
            label="Pitch"
            placeholder="Briefly describe your idea and what problem it solves"
            errorMassage={errors.pitch[0]}
          />
        </div>

        <Button type="submit" className="startup-form_btn">
          {isPending ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span className="text-white">Submit Your Pitch</span>
              <Send className="size-6 text-white" />
            </>
          )}
        </Button>
      </form>
  );
};

export default StartupForm;
