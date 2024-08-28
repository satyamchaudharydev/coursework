"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["All", "IA", "EE", "TokE"];

const fadeInAnimateVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({ opacity: 1, y: 0, transition: { delay: index * 0.05 } }),
};

export const Tabs = ({ onTabChange }: { onTabChange: (tab: string) => void }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
    onTabChange(tabs[index]);
  };

  return (
    <div className="tabs flex gap-4 flex-wrap">
      {tabs.map((tab, index) => (
        <motion.div
          key={index}
          variants={fadeInAnimateVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={index}
          className="relative cursor-pointer px-[12px] py-[6px] font-[600]"
          onClick={() => handleTabClick(index)}
        >
          {index === selectedTab && (
            <motion.div
              layoutId="tab"
              className="absolute inset-0 bg-white rounded-xl"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span
            className={cn(
              "relative z-10 text-nowrap",
              index === selectedTab ? "text-primary" : "text-[#98A1BB]"
            )}
          >
            {tab}
          </span>
        </motion.div>
      ))}
    </div>
  );
};
