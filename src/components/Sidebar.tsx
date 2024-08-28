"use client";

import { LayoutDashboard } from "lucide-react";
import { Icons } from "./Icons";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { staggerItems } from "@/lib/variants";
import Image from "next/image";
import { Button } from "./ui/button";
import AuthButton from "./AuthButton";

export const menuItems = [
  {
    name: "dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Book",
    path: "/book",
    icon: Icons.book,
  },
  {
    name: "Copy",
    path: "/copy",
    icon: Icons.copy,
  },
  {
    name: "Quiz",
    path: "/quiz",
    icon: Icons.quiz,
  },
];

export default function SideBar() {
  const currentPath = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActivePath = (path: string) => {

    return currentPath === path;
  };
  return (
    <>
      <div className="sticky top-0 hidden h-lvh  p-2 font-mont sm:block">
        <div className="z-[100] flex h-full flex-col text-clip rounded-2xl bg-white md:w-[52px] items-center py-4 gap-2 justify-between">
         <div>
          <Link href="/">
            <Icons.logo />
          </Link>
          <motion.ul className="flex flex-col gap-1 mt-4"
              variants={staggerItems}
              initial="hidden"
              animate={"show"}
          >
            {menuItems.map((item) => (
              <>
                <Link
                  href={item.path}
                  key={item.name}
                  className="relative isolate p-2 flex items-center justify-center"
                >
                  <item.icon
                    className={`${
                      isActivePath(item.path) ? "text-white" : "text-black"
                    }`}
                  />
                  {isActivePath(item.path) && (
                    <motion.div
                      layoutId="menuItem"
                      className="absolute w-full h-full rounded-full bg-[#6947BF] inset-0 z-[-1]"
                    ></motion.div>
                  )}
                </Link>
              </>
            ))}
          </motion.ul>
         </div>
         {/* avtar */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full">
              <Image src="/images/avtar.png" alt="Your profile" width={32} height={32}  objectFit="cover" className="rounded-full" />
            </div>
           
            </div>
        </div>
      </div>
      <div className=" absolute top-2 right-[150px] ">
         <AuthButton />

        </div>
          {/* login button */}
      <div
        className="z-[9999] sticky top-0  2xl:h-[90px] px-[12px] flex sm:hidden h-[60px] bg-white
      justify-between items-center
  "
      >
        <Icons.logo />

        {/* Mobile Hamburger */}
        <motion.button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.97 }}
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-14 left-0 right-0 bg-white p-5 border-t border-gray-[#ddd]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <>
                    <Link
                      href={item.path}
                      key={item.name}
                      className={cn(["relative isolate p-2 text-gray-400 flex items-center gap-2 ", 
                      isActivePath(item.path) ? "text-white" : "text-black"
                    ])}
                    >
                      <item.icon
                        
                      />
                      <span className="text-xs font-[700]">{item.name}</span>
                      {isActivePath(item.path) && (
                        <motion.div
                          layoutId="menuItem"
                          className="absolute w-full h-full rounded-full bg-[#6947BF] inset-0 z-[-1]"
                        ></motion.div>
                      )}
                    </Link>
                  </>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
