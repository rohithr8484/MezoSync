import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] hover:scale-[1.02]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg",
        outline: "border-2 border-input bg-background hover:bg-accent/10 hover:text-accent hover:border-accent/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md",
        ghost: "hover:bg-accent/10 hover:text-accent",
        link: "text-accent underline-offset-4 hover:underline hover:text-accent/80",
        hero: "bg-[image:var(--gradient-accent)] text-accent-foreground hover:opacity-90 shadow-[var(--shadow-accent)] hover:shadow-[var(--shadow-glow)] hover:scale-105 font-semibold",
        heroOutline: "border-2 border-accent/40 bg-accent/10 text-accent hover:bg-accent/20 hover:border-accent/60 backdrop-blur-sm hover:scale-105 font-semibold",
        premium: "bg-[image:var(--gradient-accent)] text-accent-foreground shadow-[var(--shadow-accent)] hover:shadow-[var(--shadow-glow)] hover:scale-105 relative overflow-hidden before:absolute before:inset-0 before:bg-[image:var(--gradient-glow)] before:opacity-0 hover:before:opacity-100 before:transition-opacity",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
