import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface IIcon
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconVariants> {
  element: React.ElementType;
}
export default function Icon({
  children,
  element,
  className,
  size = "md",
  ...props
}: IIcon) {
  const IconElement = element;
  return (
    <IconElement
      {...props}
      className={twMerge(clsx(iconVariants({ size })), className)}
    />
  );
}

const variants = {
  variants: {
    size: {
      xs: "text-sm",
      sm: "text-md",
      md: "text-lg",
      lg: "text-xl",
      xl: "text-2xl",
    },
  },
};

const iconVariants = cva(
  "flex items-center justify-center rounded-md transition-transform duration-300 hover:scale-110 text-white",
  variants
);
