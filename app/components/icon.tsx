import { VariantProps, cva } from "class-variance-authority";
import { BaseHTMLAttributes } from "react";
import cn from "../utilities/cn";

interface IIcon
  extends BaseHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof IconVariants> {}

export default function Icon({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: IIcon) {
  return (
    <div {...props} className={cn(IconVariants({ variant, size }), className)}>
      {children}
    </div>
  );
}

const variants = {
  variants: {
    variant: {
      primary: "text-white",
    },
    size: {
      xs: "text-lg",
      sm: "text-2xl",
      md: "text-4xl",
      lg: "text-6xl",
      xl: "text-8xl",
    },
  },
};

const IconVariants = cva("flex items-center justify-center", variants);
