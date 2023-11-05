import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface IIcon
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconVariants> {}
export default function Icon({
  children,
  className,
  size = "md",
  ...props
}: IIcon) {
  return (
    <div
      {...props}
      className={twMerge(clsx(iconVariants({ size })), className)}
    ></div>
  );
}

const variants = {
  variants: {
    size: {
      xs: "w-10 h-10",
      sm: "w-20 h-20",
      md: "w-28 h-28",
      lg: "w-36 h-36",
      xl: "w-48 h-48",
    },
  },
};

const iconVariants = cva(
  "flex items-center justify-center rounded-md transition-transform duration-300 hover:scale-110 text-white",
  variants
);
