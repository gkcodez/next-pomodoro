import { VariantProps, cva } from "class-variance-authority";
import { BaseHTMLAttributes } from "react";
import cn from "../utilities/cn";

interface IIcon
  extends BaseHTMLAttributes<HTMLOrSVGImageElement>,
    VariantProps<typeof IconVariants> {
  element: React.ElementType;
}

export default function Icon({
  children,
  className,
  variant,
  element,
  size = "md",
  ...props
}: IIcon) {
  const IconComponent = element;
  return (
    <IconComponent
      {...props}
      className={cn(IconVariants({ variant, size }), className)}
    />
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

const IconVariants = cva("w-full", variants);
