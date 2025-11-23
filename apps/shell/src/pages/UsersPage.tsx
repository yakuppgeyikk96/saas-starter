import { lazy, Suspense } from "react";

const Users = lazy(() => import("users/Users"));

const UsersPage = () => {
  return (
    <div className="p-6">
      <Suspense fallback={<div className="text-center py-8">Loading Users...</div>}>
        <Users />
      </Suspense>
    </div>
  );
};

export default UsersPage;

