"use client";
import { EvaluationSection } from "@/app/coursework/[id]/page";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Icons } from "./Icons";
import CircularProgress from "./CircularProgress";
import { getGradeInfo } from "@/lib/utils";

export const Criteria = ({ section, defaultOpen = true }: { section: EvaluationSection, defaultOpen: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);

  const score = section.score;
  const total = section.total;
  const percentage = Math.round((score / total) * 100);
  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen])
  return (
    <div className="bg-white rounded-3xl mt-4 p-4 overflow-hidden cursor-pointer">
      <div onClick={() => setOpen(!open)} className="flex justify-between">
        <div className="flex gap-2 justify-center items-center">
        <CircularProgress percentage={percentage} colour={getGradeInfo(score,total).color}  size={50} fontSize={0.8} text={
          `${score}/${total}` 
        }/>
        <div>
          <h3 className="text-xs font-[600] leading-[normal] text-[#98A1BB]">
            {section.title}:
          </h3>
          <h3 className="text-xl font-[600] leading-[normal] text-black">
            {section.name}
          </h3>
        </div>
        </div>
        <motion.div initial={false} animate={{ rotate: open ? 180 : 0 }}>
          <ChevronUp />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            className=" flex flex-col gap-3"
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.6, type: "ease" }}
          >
            <div className=" flex flex-col gap-3 border-t border-[#D6DFE4] mt-2 py-4">
              <p className="text-wrap text-sm font-[600] leading-[normal] text-neutrals-700 line-clamp-3">
                {section.description}
              </p>

              <h4 className="text-xl font-extrabold leading-[normal] text-black">
                Strengths
              </h4>
              <ul className="flex flex-col gap-2 rounded-2xl border p-4 border-green bg-[#3CC28A05]">
                {section.strengths.map((strength, index) => (
                  <li
                    className="text-sm font-[600] leading-[normal] text-[#3D404B] flex gap-2 items-center "
                    key={index}
                  >
                    <span className="text-green">
                      <Icons.check />
                    </span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-xl font-extrabold leading-[normal] text-black">
                Improvements
              </h4>
              <ul className="flex flex-col gap-2 rounded-2xl border p-4 border-yellow bg-[#3CC28A05]">
                {section.improvements.map((improvement, index) => (
                  <li
                    className="text-sm font-[600] leading-[normal] text-[#3D404B] flex gap-2  items-center"
                    key={index}
                  >
                    <span className="text-yellow">
                      <Icons.warning />
                    </span>
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
