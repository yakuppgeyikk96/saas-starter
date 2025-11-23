import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("dashboard/Dashboard"));

const DashboardPage = () => {
  return (
    <div className="p-6">
      <Suspense fallback={<div className="text-center py-8">Loading Dashboard...</div>}>
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default DashboardPage;

