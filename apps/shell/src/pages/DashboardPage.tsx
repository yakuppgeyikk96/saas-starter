import { lazy, Suspense } from "react";
import { PageLoading } from "../components/PageLoading";

const Dashboard = lazy(() => import("dashboard/Dashboard"));

const DashboardPage = () => {
  return (
    <div className="p-6">
      <Suspense fallback={<PageLoading message="Loading dashboard..." />}>
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
