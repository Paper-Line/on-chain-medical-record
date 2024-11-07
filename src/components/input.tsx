import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string | ReactNode;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  additionalElement?: ReactNode;
  error?: any;
  register?: any;
}

export const TextInput = (props: TextInputProps) => {
  const { containerClassName, inputClassName, labelClassName, additionalElement, error, ...restOfProps } = props;
  const { name, label } = restOfProps;

  return (
    <div className={twMerge("relative", containerClassName ? containerClassName : "")}>
      <label
        htmlFor={name}
        className={twMerge("text-neutral-500 text-xs transition-all duration-300 peer-hover:text-green-200", labelClassName)}
      >
        {label}
      </label>
      <input
        id={name}
        className={twMerge(
          "peer w-full pb-2 bg-transparent appearance-none transition-colors duration-300 border-b border-neutral-500 hover:border-green-300  placeholder-shown:border-neutral-200 focus:outline-none focus:border-green-300",
          inputClassName,
          error ? "border-red-700 focus:border-red-500" : ""
        )}
        {...restOfProps}
      />

      {additionalElement ? additionalElement : null}
      {error ? <p className="mt-1 bottom-0 text-red-600 text-[10px] leading-none">{error.message}</p> : null}
    </div>
  );
};
