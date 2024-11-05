import React, { forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  additionalElement?: ReactNode;
  error?: any;
  register?: any;
}

export const TextInput = forwardRef<HTMLButtonElement, TextInputProps>((props, ref) => {
  const { containerClassName, inputClassName, labelClassName, additionalElement, error, register = () => {}, ...restOfProps } = props;
  const { name, placeholder } = restOfProps;

  return (
    <div className={twMerge("relative", containerClassName ? containerClassName : "")}>
      <input
        id={name}
        ref={ref}
        className={twMerge(
          "peer w-full px-4 h-12 bg-transparent border-neutral-500 hover:border-primary-sea rounded-[10px] border placeholder-transparent appearance-none transition-colors duration-300 placeholder-shown:border-neutral-500 focus:outline-none focus:border-primary-sea",
          inputClassName,
          error ? "border-red-700 focus:border-red-500" : ""
        )}
        {...register(name)}
        {...restOfProps}
      />
      <label
        htmlFor={name}
        className={twMerge(
          "absolute bg-inherit px-1.5 left-2 -top-2 transition-all duration-300 text-neutral-500 peer-hover:text-neutral-500 bg-white text-xs peer-placeholder-shown:text-base peer-placeholder-shown:px-1 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-primary-sea peer-focus:text-xs peer-focus:px-1.5",
          labelClassName
        )}
      >
        {placeholder}
      </label>

      {additionalElement ? additionalElement : null}
      {error ? <p className="mt-1 bottom-0 text-red-600 text-[10px] leading-none">{error.message}</p> : null}
    </div>
  );
});
