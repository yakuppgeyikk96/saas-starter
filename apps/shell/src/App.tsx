import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("dashboard/Dashboard"));

const App = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-red-500">Shell App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default App;
