"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import React, { useMemo, useState } from "react";
import FileUpload from "./FileUpload";
import { Coursework, CourseworkType, useCourseworkStore } from "@/store/useCourseWorkStore";
import { Form, FormField, FormItem, FormLabel, FormControl } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { EvaluationButton } from "./EvaluationButton";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { type } from "os";

const courseworkTypeOptions = [
  { value: "TokE", label: "Tok Essay" },
  { value: "Ee", label: "Extended Essay" },
  { value: "Ia", label: "Internal Assessment" },
] as const;

const subjectsByType = {
  Ee: [
    { value: "Bussiness Management", label: "Bussiness Management" },
    { value: "Economics", label: "Economics" },
    { value: "Internal Assessment", label: "Internal Assessment" },
  ],
  Ia: [{ value: "Math", label: "Mathematics" }],
  TokE: null,
} as const;

const formSchema = z.object({
  courseworkType: string(),
  title: z.string(),
  subject: z.string(),
  file: z.string(),
});

export const CourseWorkForm = React.memo(() => {
  const {addCoursework, removeAllCourseworks} = useCourseworkStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseworkType: "",
      title: "",
      subject: "",
      file: "",
    },
  });

  const { handleSubmit, control, watch } = form;
  const courseworkType = watch("courseworkType") as CourseworkType;
  const title = watch("title");
  const subject = watch("subject");
  const file = watch("file");

  const availableSubjects = useMemo(
    () => subjectsByType[courseworkType],
    [courseworkType]
  );
  const courseworkLabel = availableSubjects
    ? "Select a Coursework Type and Subjects"
    : "Select a Coursework Type";
  const isDisabled =
    !courseworkType || !title || !file || (availableSubjects && !subject);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const updateValues = {
      ...values,
      topic: "Algebra",
      totalWords: 1000,
      totalTimeReading: 10,
      language: "English",
      courseworkType: values.courseworkType as CourseworkType,
      evaluation: {
        maxScore: 7,
        totalScore: 5,
        evaluationDate: new Date().toISOString(),
      },
    };
    try {
      setTimeout(() => {
        setIsLoading(false);
        const newCoursework = addCoursework(updateValues);
      
        if(newCoursework instanceof Error) {
          toast({
            title: "Quota Exceeded",
            description: "You have exceeded the maximum number of coursework",
            variant: "destructive",
            action: <Button
              variant="secondary"
              onClick={() => {
                removeAllCourseworks();
              }}
            >Clear</Button>,
          
        });
        }
        else {
          toast({
            title: "Coursework added",
            description: "Your coursework has been added successfully",
            variant: "default",
          });
          router.push(`/coursework/${newCoursework.id}`);
        }

        form.reset({});
      }, 4000);
    } catch (error: any) {
      console.log(error, "error");
       
  }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 rounded-lg"
      >
        {/* File Upload */}
        <FormField
          name="file"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUpload onFileChangeHandle={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Coursework Type and Subject */}
        <div className="flex gap-3 flex-col">
          <FormLabel className="font-[600] text-gray-200">
            {courseworkLabel}*
          </FormLabel>
          <div className="flex gap-4">
            <FormField
              control={control}
              name="courseworkType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[200px] rounded-full bg-white">
                        <SelectValue placeholder="Select a CourseType" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {courseworkTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {availableSubjects && (
              <FormField
                control={control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[180px] rounded-full bg-white">
                          <SelectValue placeholder="Select a Subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {availableSubjects.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        {/* Title */}
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-[600] text-gray-200">
                Enter your essay title*
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="how nation works..."
                  {...field}
                  className="rounded-full bg-white"
                  style={{ maxWidth: "330px" }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <EvaluationButton disable={!!isDisabled} isLoading={isLoading} />
      </form>
    </Form>
  );
});
