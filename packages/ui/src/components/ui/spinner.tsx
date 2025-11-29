import { Loader2 } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <Loader2
          className={cn("animate-spin text-primary", sizeClasses[size])}
        />
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner };
