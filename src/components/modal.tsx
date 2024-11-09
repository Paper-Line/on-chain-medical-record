"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

import { MdClose } from "react-icons/md";

interface ModalProps {
  content: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  containerClassName?: string;
  backdropClassName?: string;
  closeButton?: boolean;
}

export const Modal = (props: ModalProps) => {
  const { onClose, isOpen, content, title, subtitle, containerClassName, backdropClassName, closeButton = true } = props;

  return (
    <div
      className={twMerge("fixed inset-0 z-50 w-full h-full flex-1 p-4 flex-col items-center justify-center", isOpen ? "flex" : "hidden")}
    >
      <div className={twMerge("absolute w-full h-full bg-black bg-opacity-30", backdropClassName)} onClick={onClose} />
      <div
        className={`z-10 w-full sm:max-w-md lg:max-w-2xl bg-white rounded-[14px] border-b border-x border-neutral-500 ${containerClassName}`}
      >
        <div className="w-full relative flex justify-between p-3">
          <div>
            {title ? <h1 className="text-xl font-bold text-black">{title}</h1> : null}
            {subtitle ? <h5 className="text-sm text-neutral-700">{subtitle}</h5> : null}
          </div>

          {closeButton ? (
            <button onClick={onClose} className="absolute top-3 right-3">
              <MdClose size={25} className="cursor-pointer text-neutral-600 hover:text-neutral-900 transition-colors duration-200" />
            </button>
          ) : null}
        </div>
        <div className="px-4 pt-3 pb-5">{content}</div>
      </div>
    </div>
  );
};
