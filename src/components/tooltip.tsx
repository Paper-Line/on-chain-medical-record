"use client";

import { useState, ReactNode, useRef } from "react";
import { twMerge } from "tailwind-merge";

import useOutsideClick from "@/hooks/outsideClick";

type TooltipProps = {
  content: ReactNode;
  contentClassName?: string;
  children: ReactNode;
};

export default function Tooltip({ content, contentClassName, children }: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  //  When the user clicks on outside of the dropdown menu, close it
  const backdropRef = useRef(null);

  useOutsideClick({
    ref: backdropRef,
    onClick: () => setShowTooltip(false)
  });

  return (
    <>
      <div
        ref={backdropRef}
        className={twMerge("fixed top-0 left-0 w-full h-full z-10 bg-transparent opacity-50", showTooltip ? "block" : "hidden")}
      />

      <div className="relative w-full">
        <div className="flex cursor-pointer items-center" onClick={() => setShowTooltip(!showTooltip)}>
          {children}
        </div>
        {showTooltip && (
          <div
            className={`absolute transform bg-neutral-100 rounded-md py-1 px-4 border border-neutral-300 transition-all duration-300 z-50 ${contentClassName}`}
          >
            {content}
          </div>
        )}
      </div>
    </>
  );
}
