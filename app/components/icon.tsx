import { VariantProps, cva } from "class-variance-authority";
import { BaseHTMLAttributes, ReactElement } from "react";
import cn from "../utilities/cn";

interface IIcon
  extends BaseHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof IconVariants> {
  element: ReactElement;
}

export default function Icon({
  children,
  className,
  element,
  variant,
  size = "md",
  ...props
}: IIcon) {
  return (
    <div {...props} className={cn(IconVariants({ variant, size }), className)}>
      {element}
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
