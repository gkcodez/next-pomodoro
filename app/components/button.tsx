import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "./icon";
import Label from "./label";

interface IButton
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon: ReactNode;
}
export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  orientation = "vertical",
  ...props
}: IButton) {
  return (
    <button
      {...props}
      className={twMerge(
        clsx(buttonVariants({ variant, size, orientation })),
        className
      )}
    >
      <div
        className={twMerge(
          clsx(buttonVariants({ orientation })),
          "gap-1 items-center justify-center pointer-events-none"
        )}
      >
        <Icon element={icon} size={size} />
        <Label size={size}>{children}</Label>
      </div>
    </button>
  );
}

const variants = {
  variants: {
    variant: {
      primary: "bg-sky-600",
      secondary: "bg-gray-600",
      warning: "bg-yellow-600",
      danger: "bg-red-600",
      success: "bg-emerald-600",
    },
    orientation: {
      vertical: "flex-col gap-2",
      horizontal: "flex gap-2",
    },
    size: {
      xs: "w-10 h-10",
      sm: "w-20 h-20",
      md: "w-28 h-28",
      lg: "w-36 h-36",
      xl: "w-48 h-48",
    },
  },
};

const buttonVariants = cva(
  "flex items-center justify-center rounded-md transition-transform duration-300 hover:scale-110 text-white",
  variants
);
