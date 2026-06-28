import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-brandblue to-primary text-primary-foreground shadow-[0_8px_22px_-6px_rgba(37,99,235,0.5)] hover:brightness-105",
        gold: "bg-gradient-to-br from-gold-soft to-gold text-gold-ink shadow-[0_8px_22px_-6px_rgba(200,150,30,0.5)] hover:brightness-105",
        secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
        outline:
          "border border-input bg-card hover:bg-accent hover:text-accent-foreground hover:border-primary/60",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "border border-destructive/40 bg-destructive/5 text-destructive hover:bg-destructive/12",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-md px-3 text-[13px]",
        lg: "h-12 rounded-lg px-7 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
