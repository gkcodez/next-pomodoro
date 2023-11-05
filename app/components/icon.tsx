import { VariantProps, cva } from "class-variance-authority";
import { CanvasHTMLAttributes } from "react";
import cn from "../utilities/cn";

interface IIcon
  extends CanvasHTMLAttributes<HTMLCanvasElement>,
    VariantProps<typeof IconVariants> {
  element: React.ElementType;
}

export const Icon = ({
  children,
  className,
  variant,
  element,
  size = "md",
  ...props
}: IIcon) => {
  const IconComponent = element;
  return (
    <IconComponent
      {...props}
      className={cn(IconVariants({ variant, size }), className)}
    />
    // <p
    //   className={twMerge(
    //     clsx(IconVariants({ orientation })),
    //     `font-semibold uppercase ${getTextSize(size)}`
    //   )}
    // >
    //   {children}
    // </p>
  );
};

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
