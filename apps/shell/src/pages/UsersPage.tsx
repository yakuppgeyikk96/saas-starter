import { lazy, Suspense } from "react";
import { PageLoading } from "../components/PageLoading";

const Users = lazy(() => import("users/Users"));

const UsersPage = () => {
  return (
    <div className="p-6">
      <Suspense fallback={<PageLoading message="Loading users..." />}>
        <Users />
      </Suspense>
    </div>
  );
};

export default UsersPage;
