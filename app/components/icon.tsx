import { VariantProps, cva } from "class-variance-authority";
import { BaseHTMLAttributes } from "react";
import cn from "../utilities/cn";

interface IIcon
  extends BaseHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof IconVariants> {
  name: React.ElementType;
}

export default function Icon({
  children,
  className,
  name,
  variant,
  size = "md",
  ...props
}: IIcon) {
  const IconElement: React.ElementType = name;
  return (
    <IconElement
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
