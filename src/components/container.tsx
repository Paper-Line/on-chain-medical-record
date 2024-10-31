import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: string | JSX.Element | JSX.Element[] | ReactNode;
  className?: string | undefined;
}

export default function Container(props: ContainerProps) {
  const { children, className } = props;

  return <div className={twMerge("w-full mx-auto max-w-[1440px]", className)}>{children}</div>;
}
