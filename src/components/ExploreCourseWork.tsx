import React, { useState, useEffect, useMemo } from 'react';
import { Coursework, useCourseworkStore } from "@/store/useCourseWorkStore";
import CourseWorkList from './CourseWorkList';
import { Tabs } from "./Tabs";
import { motion } from 'framer-motion';
import { variants } from '@/lib/variants';



const ExploreCourseWork: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const courseWorks = useCourseworkStore((state) => state.getSortedExampleCourseworks());

  const filteredCourseworks = useMemo (() => {
    if (selectedTab === "All") return courseWorks;
    return courseWorks.filter((coursework) => coursework.courseworkType.toLowerCase() === selectedTab.toLowerCase());
  }, [selectedTab, courseWorks]);

  return (
    <div className="mt-4 space-y-4">
      <motion.h2
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
        className="text-gray-200 font-[600] mb-2 text-xl"
      >
        Explore Coursework
      </motion.h2>
      <Tabs onTabChange={setSelectedTab} />
      <CourseWorkList courseworks={filteredCourseworks} key={selectedTab} />
    </div>
  );
};

export default ExploreCourseWork;