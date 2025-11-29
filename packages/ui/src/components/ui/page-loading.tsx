import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { Spinner } from "./spinner";

interface PageLoadingProps {
  className?: string;
  message?: string;
}

const PageLoading = React.memo(
  ({ className, message = "Loading..." }: PageLoadingProps) => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    if (!mounted) {
      return null;
    }

    const content = (
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center",
          "bg-background/80 backdrop-blur-sm",
          "animate-in fade-in-0",
          className
        )}
        role="status"
        aria-label="Loading"
      >
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" />
          {message && (
            <p className="text-sm text-muted-foreground animate-pulse">
              {message}
            </p>
          )}
        </div>
      </div>
    );

    return createPortal(content, document.body);
  }
);

PageLoading.displayName = "PageLoading";

export { PageLoading };
