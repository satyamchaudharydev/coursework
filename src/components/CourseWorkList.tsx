import React, { useState } from 'react';
import { motion } from "framer-motion";
import { variants } from "@/lib/variants";
import Card from "./Card";
import { Button } from "./ui/button";
import { Coursework } from '@/store/useCourseWorkStore';

const CourseWorkList = ({ title, courseworks, initialDisplayCount = 2 }: {
    title?: string;
    courseworks: Coursework[];
    initialDisplayCount?: number;
}) => {
  const [displayedCoursework, setDisplayedCoursework] = useState(courseworks.slice(0, initialDisplayCount));
  const [showAll, setShowAll] = useState(false);

  const viewAll = () => {
    setDisplayedCoursework(courseworks);
    setShowAll(true);
  };

  return (
    <div className="flex flex-col gap-2">
     {title && (  
        <motion.h2 
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-gray-200 font-[600] mb-2 text-xl"
        >
          {title}
        </motion.h2>
      )}
      {displayedCoursework.length === 0 && (
        <div className="flex justify-center items-center flex-col gap-2">
          <p className="text-sm text-gray-200">No coursework available</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {displayedCoursework.map((coursework, index) => (
          <motion.div
            key={coursework.id}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
          >
            <Card coursework={coursework} />
          </motion.div>
        ))}
      </div>
      {!showAll && displayedCoursework.length < courseworks.length && (
        <Button 
          className="bg-transparent text-gray-200 mx-auto shadow-none hover:bg-white"
          onClick={viewAll}
        >
          View All
        </Button>
      )}
    </div>
  );
};

export default CourseWorkList;