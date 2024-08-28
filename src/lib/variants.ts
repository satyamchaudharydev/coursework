import { delay } from "framer-motion";
import { number } from "zod";

export const staggerItems = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
export const variants = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0, 
      transition: {
        delay: i * 0.1,
        
        type: "spring",
      },
    }),
    hidden: { opacity: 0, y: 50 }, // Initial state with Y offset
  };
