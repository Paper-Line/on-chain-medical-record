import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";

import DropdownIcon from "@/assets/dropdown.svg";

type AccordionProps = {
  title: string | React.ReactNode;
  body: React.ReactNode;
  initialOpen?: boolean;
  containerClassName?: string;
  titleClassName?: string;
  iconSize?: number;
};

export const Accordion = (props: AccordionProps) => {
  const { title, body, initialOpen, containerClassName, titleClassName, iconSize = 16 } = props;

  const [isOpen, setIsOpen] = useState(initialOpen || false);

  return (
    <div className={containerClassName}>
      <motion.header
        key="question"
        className="w-full flex flex-row justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        initial={false}
      >
        <motion.div className={twMerge("text-sm font-bold", titleClassName)}>{title}</motion.div>

        <Image src={DropdownIcon} alt="icon" width={20} height={20} className={isOpen ? "rotate-180" : ""} />
      </motion.header>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.4, ease: [0.5, 0.66, 0.88, 0.99] }}
            className="text-sm"
          >
            {body}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};
