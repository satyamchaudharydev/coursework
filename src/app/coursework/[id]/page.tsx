"use client"

import CircularProgres from "@/components/CircularProgress";
import { Criteria } from "@/components/Criteria";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PDFViewer from "@/components/PdfViewer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Coursework from "../Coursework";

export type EvaluationSection = {
  title: string;
  name: string;
  description: string;
  strengths: string[];
  improvements: string[];
  score: number;
  total: number;
};

const getGradeInfo = (score: number, totalScore: number) => {
  const percentage = (score / totalScore) * 100;

  if (percentage >= 90) {
    return {
      grade: "Excellent",
      color: "green",
    };
  } else if (percentage >= 80) {
    return {
      grade: "Good",
      color: "blue",
    };
  } else if (percentage >= 70) {
    return {
      grade: "Average",
      color: "yellow",
    };
  } else {
    return {
      grade: "Poor",
      color: "red",
    };
  }
  
}

const evaluation: {
  sections: EvaluationSection[];
} = {
  sections: [
    {
      title: "Criteria A",
      name: "pdfRef",
      description:
        "The student should be able to create a PDF viewer component that can display a PDF file.",
      strengths: [
        "The student has created a PDF viewer component that can display a PDF file.",
        "The student has used the react-pdf library to display the PDF file.",
        "The student has implemented a toolbar with buttons to zoom in, zoom out, and expand the PDF viewer.",
      ],
      improvements: [
        "The student should add a button to collapse the PDF viewer.",
        "The student should add a button to navigate to the next page of the PDF file.",
        "The student should add a button to navigate to the previous page of the PDF file.",
      ],
      score: 3,
      total: 5,
    },
    {
      title: "Criteria B",
      name: "pdfRef",
      description:
        "The student should be able to create a PDF viewer component that can display a PDF file.",
      strengths: [
        "The student has created a PDF viewer component that can display a PDF file.",
        "The student has used the react-pdf library to display the PDF file.",
        "The student has implemented a toolbar with buttons to zoom in, zoom out, and expand the PDF viewer.",
      ],
      improvements: [
        "The student should add a button to collapse the PDF viewer.",
        "The student should add a button to navigate to the next page of the PDF file.",
        "The student should add a button to navigate to the previous page of the PDF file.",
      ],
      score: 3,
      total: 5,
    },
  ],
};

const totalScore = evaluation.sections.reduce(
  (acc, section) => acc + section.score,
  0
);
const totalPossibleScore = evaluation.sections.reduce(
  (acc, section) => acc + section.total,
  0
);

const Page = ({params}: {
  params: {
    id: string
  }
} ) => {
  const id = params.id;

  return (
    <MaxWidthWrapper className="max-w-[2000px]">
      <Coursework id={id} />
    </MaxWidthWrapper>
  );
};
export default Page;
