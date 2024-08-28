import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Icons } from "./Icons";
import PDFPreview from "./PdfPreview";
import { AnimatePresence, motion } from "framer-motion";
import { Progress } from "./ui/progress";
import { toast } from "./ui/use-toast";
import { useCourseworkStore } from "@/store/useCourseWorkStore";

interface FileUploadProps {
  onFileChangeHandle: (fileUrl: string) => void;
}

export default function FileUpload({ onFileChangeHandle }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileProgress, setFileProgress] = useState<number>(0);

  useEffect(() => {
    if (isUploading) {
      const progressSteps = [10, 40, 60, 99];
      let currentStep = 0;

      const progressInterval = setInterval(() => {
        if (currentStep < progressSteps.length) {
          setFileProgress(progressSteps[currentStep]);
          currentStep++;
        } else {
          clearInterval(progressInterval);
          setFileProgress(100);
          setIsUploading(false);
        }
      }, 500); 

      return () => clearInterval(progressInterval);
    }
  }, [isUploading]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    handleFileSelection(selectedFile);
    event.target.value = "";
  };

  const handleFileSelection = (selectedFile: File | undefined) => {
    if (
      selectedFile &&
      selectedFile.type === "application/pdf" &&
      selectedFile.size <= 25 * 1024 * 1024
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileUrl = reader.result as string;
        setFile(selectedFile);
        setFileProgress(0);
        setIsUploading(true); // Start upload simulation
        onFileChangeHandle(fileUrl);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      toast({
        title: "Invalid file",
        description:
          "Please upload a PDF file that is less than 25 MB in size.",
        variant: "destructive",
      });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const selectedFile = event.dataTransfer.files?.[0];
    handleFileSelection(selectedFile);
  };

  const renderContent = () => {
    if (isUploading) {
      return (
        <motion.div
          key={"uploading"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-xs font-[600] text-gray-200 flex flex-col items-center justify-center gap-2 min-w-[100px]"
        >
          Uploading...
          <Progress value={fileProgress} />
        </motion.div>
      );
    }

    if (!file) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          key={"upload"}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center items-center flex-col gap-[20px]"
        >
          <div className="flex justify-center items-center flex-col gap-2">
            <span>
              <Icons.fileUp />
            </span>
            <div className="flex items-center justify-center flex-col">
              <p className="font-[700]">Drag and drop a PDF</p>
              <p className="text-xs font-semibold text-neutrals-600 center">
                *Limit 25 MB per file.
              </p>
            </div>
          </div>
          <Button
            type="button"
            onClick={() => document.getElementById("file-input")?.click()}
            variant={"outline"}
            size={"lg"}
          >
            Upload your PDF
          </Button>
        </motion.div>
      );
    } else {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          key={"uploaded"}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-2 relative border border-[#EAF0F2] rounded-md flex justify-center items-center gap-2 font-[700]"
        >
          <div className="border rounded-md border-[#D6DFE4] h-[3rem] w-[3rem] overflow-hidden">
            <PDFPreview fileUrl={file} width={100} height={150} />
          </div>
          <div className="flex gap-2">
            <Icons.check fill="#3CC28A" className="text-[#3CC28A]" />
            <span className="truncate max-w-[30ch]">{file.name}</span>
          </div>
          <button
            className="border border-[#D9D9D9] p-1 absolute top-[-8px] right-[-8px] rounded-full bg-white"
            onClick={() => {
              setFile(null);
              setFileProgress(0);
              setIsUploading(false);
              onFileChangeHandle("");
            }}
          >
            <X
              className="w-[0.8rem] h-[0.8rem] text-gray-200"
              strokeWidth={2}
            />
          </button>
        </motion.div>
      );
    }
  };

  return (
    <motion.div
      className={`file-upload text-gray-200 bg-white ${
        isDragging ? "active" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="h-[200px] flex justify-center items-center rounded-[12px]">
        <input
          type="file"
          hidden
          id="file-input"
          onClick={(event: any) => {
            event.target.value = null;
          }}
          onChange={onFileChange}
          accept=".pdf"
        />
        <AnimatePresence initial={false}>
          <div>{renderContent()}</div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}