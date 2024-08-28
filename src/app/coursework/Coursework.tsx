"use client";

import { useState, useCallback } from "react";
import CircularProgress from "@/components/CircularProgress";
import { Criteria } from "@/components/Criteria";
import PDFViewer from "@/components/PdfViewer";
import { Button } from "@/components/ui/button";
import useSize from "@/hooks/useSize";
import { useCourseworkStore } from "@/store/useCourseWorkStore";
import { ArrowRight } from "lucide-react";
import { evaluation } from "@/data";
import { getGradeInfo } from "@/lib/utils";

export type EvaluationSection = {
  title: string;
  name: string;
  description: string;
  strengths: string[];
  improvements: string[];
  score: number;
  total: number;
};



const totalScore = evaluation.sections.reduce((acc, section) => acc + section.score, 0);
const totalPossibleScore = evaluation.sections.reduce((acc, section) => acc + section.total, 0);

const Coursework = ({ id }: { id: string }) => {
  const courseWorks = useCourseworkStore((state) => state.courseworks);
  const sampleCourseWorks = useCourseworkStore((state) => state.exampleCoursework);
  const coursework = [...courseWorks, ...sampleCourseWorks].find((cw) => cw.id === id);

  const { width: screenWidth } = useSize();
  const [showFile, setShowFile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [desktopCollapse, setDesktopCollapse] = useState(false);
  const [openEvaluation, setOpenEvaluation] = useState(false);

  const handleCollapseFile = useCallback(() => {
    if (screenWidth > 900) {
      toggleOpenEvaluation()
    } else {
      setIsCollapsed((prev) => !prev);
    }
  }, [screenWidth]);

  const toggleShowFile = useCallback(() => setShowFile((prev) => !prev), []);
  const toggleOpenEvaluation = useCallback(() => setOpenEvaluation((prev) => !prev), []);

  if (!coursework) return <div>Coursework not found</div>;

  const buttonLabel = showFile ? "Check detailed Evaluation" : "Expand & View your file";
  const gradeInfo = getGradeInfo(totalScore, totalPossibleScore);

  return (
    <div className="relative size-full sm:gap-6 space-y-6 lg:flex lg:space-y-0 3xl:justify-center">
      {isCollapsed  && (
        <div className="h-10 w-fit items-center justify-between self-stretch rounded-[24px] bg-white px-3 sm:h-auto sm:w-full sm:p-3  hidden sm:flex md:flex">
          <div className="max-w-[184px] rounded-xl bg-[rgba(152,161,187,0.12)] px-3 py-1">
            <p className="w-full truncate font-bricolage text-sm font-semibold leading-[normal] text-neutrals-800">
              {coursework.title}
            </p>
          </div>
          <Button
            className="flex items-center gap-2 text-primary text-base font-extrabold bg-transparent shadow-none"
            variant="secondary"
            onClick={handleCollapseFile}
          >
            Expand &amp; view your file
            <ArrowRight />
          </Button>
        </div>
      )}
      {(!isCollapsed || screenWidth > 900) && (
        <div className={`hidden sm:block max-w-[900px] flex-1 min-w-[500px]`}>
          <PDFViewer
            title="My PDF"
            pdfFile={coursework.file}
            handleCollapseFile={handleCollapseFile}
          />
        </div>
      )}

      <div className={`space-y-4 order-1`}>
        <div className="bg-white rounded-3xl p-3 pl-6 flex justify-between items-center text-gray-400">
          <div className="space-y-1">
            <h3 className="text-sm font-[600] leading-[normal] text-[14px]">Overall Score</h3>
            <h3 className="font-extrabold leading-[normal] text-2xl">
              Remark: <span style={{ color: gradeInfo.color }}>{gradeInfo.grade}</span>
            </h3>
            <p className="font-[600] leading-[normal] text-[#98A1BB] text-xs">
              Evaluated on 20 Aug 2024
            </p>
          </div>
          <CircularProgress
            percentage={(totalScore / totalPossibleScore) * 100}
            text={`${totalScore}/${totalPossibleScore}`}
            colour={gradeInfo.color}
            size={80}
            fontSize={1}
          />
        </div>

        <Button
          className="text-primary rounded-full font-bold gap-2 flex sm:hidden"
          variant="secondary"
          onClick={toggleShowFile}
        >
          {buttonLabel}
          <ArrowRight />
        </Button>

        {!showFile && (
          <div>
            {evaluation.sections.map((section, index) => (
              <Criteria
                key={index}
                section={section}
                defaultOpen={screenWidth < 900 || openEvaluation}
              />
            ))}
          </div>
        )}

        <Button
          className="text-primary rounded-full font-bold gap-2 hidden lg:flex"
          variant="secondary"
          onClick={toggleOpenEvaluation}
        >
          {openEvaluation ? "Collapse Evaluation" : "Expand Evaluation"}
          <ArrowRight />
        </Button>

        {showFile && screenWidth <= 900 && (
          <div className="block sm:hidden">
            <PDFViewer
              title="My PDF"
              pdfFile={coursework.file}
              handleCollapseFile={handleCollapseFile}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Coursework;