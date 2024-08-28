"use client";
import { CourseWorkForm } from "@/components/CourseWorkForm";
import ExploreCourseWork from "@/components/ExploreCourseWork";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { MyCourseWork } from "@/components/MyCourseWork";
import Toolbar from "@/components/Toolbar";
import { variants } from "@/lib/variants";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <MaxWidthWrapper className="flex flex-col gap-8 ">
      <div className="flex justify-between gap-6 ">
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mx-auto max-w-[500px] lg:max-w-[unset]"
        >
          <h2 className="text-[24px] font-extrabold leading-[normal] text-neutrals-900 lg:text-[32px]">
            Hey IB Folks ! Unsure about the quality of your answers?
            <span className="text-primary"> We get you.</span>
          </h2>
          <div className=" bg-[#FCFBFDB8] rounded-3xl mt-8 border border-[hsla(201, 21%, 87%, 1)] overflow-hidden p-[20px]">
            <CourseWorkForm />
          </div>
        </motion.div>
        <motion.div 
          variants={variants}
          initial="hidden"
          animate="visible"
          custom={2}
        className="hidden justify-center md:min-w-[250px] lg:flex lg:min-w-[290px] mt-auto">
          <img
            alt="eveluation image"
            width="390"
            height="528"
            decoding="async"
            data-nimg="1"
            className="h-auto sm:w-[290px]"
            src="https://www.zuai.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcoursework.e5be75b5.webp&w=828&q=75"
          />
        </motion.div>
      </div>
      {/* my coursework */}
      <MyCourseWork />
      {/* explore coursework */}
      <ExploreCourseWork />
      {/* toolbar */}
      <Toolbar />
    </MaxWidthWrapper>
  );
}
