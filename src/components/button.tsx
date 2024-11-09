import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  onClick: (() => Promise<void>) | (() => void);
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { children, onClick, className, disabled, loading, ...restOfProps } = props;

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={twMerge("mt-1 w-full py-2 font-semibold bg-green-50 text-green-500 border border-green-400 rounded-xl", className)}
      {...restOfProps}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};
