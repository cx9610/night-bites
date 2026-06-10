import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-zinc-900 text-white hover:bg-zinc-800",
        accent: "bg-red-600 text-white hover:bg-red-700",
        outline: "border bg-white text-zinc-800 hover:bg-zinc-50",
        ghost: "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}
