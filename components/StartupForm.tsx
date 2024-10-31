"use client";

import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput, { FormFieldType } from "./CustomInput";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      title: "",
      description: "",
      category: "",
      link: "",
      pitch: "" 
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("link", data.link);
      formData.append("pitch", data.pitch);
  
      const result = await createPitch(formData, data.pitch);
  
      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Please check your inputs and try again",
        variant: "destructive",
      });
    }
  };
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="startup-form">
        <div>
          <CustomInput
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="title"
            label="Title"
            placeholder="Startup Title"
          />
        </div>

        <div>
          <CustomInput
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="description"
            label="Description"
            placeholder="Startup Description"
          />
        </div>

        <div>
          <CustomInput
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="category"
            label="Category"
            placeholder="Startup Category (Tech, Health, Education...)"
          />
        </div>

        <div>
          <CustomInput
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="link"
            label="Image URL"
            placeholder="Image URL (e.g., https://example.com/image.jpg)"
          />
        </div>

        <div data-color-mode="light">
          <CustomInput
            fieldType={FormFieldType.MDEDITOR}
            control={form.control}
            name="pitch"
            label="Pitch"
            placeholder="Briefly describe your idea and what problem it solves"
          />
        </div>

        <Button
          type="submit"
          className="startup-form_btn text-white"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit Your Pitch"}
          <Send className="size-6 ml-2" />
        </Button>
      </form>
    </Form>
  );
};

export default StartupForm;
