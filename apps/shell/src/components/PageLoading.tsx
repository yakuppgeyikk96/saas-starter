import { PageLoading as UIPageLoading } from "@repo/ui/page-loading";

interface PageLoadingProps {
  message?: string;
}

export const PageLoading = ({ message }: PageLoadingProps) => {
  return <UIPageLoading message={message} />;
};
