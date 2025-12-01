import {
  QueryClient as TanstackQueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query";
import { ProtectedRoute } from "auth/components";
import { useAuthStore } from "auth/stores";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Navbar, Sidebar } from "./components/layout";
import { PageLoading } from "./components/PageLoading";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import { useThemeStore } from "./stores/themeStore";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));

const tanstackQueryClient = new TanstackQueryClient();

const App = () => {
  const theme = useThemeStore((state) => state.theme);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <TanstackQueryClientProvider client={tanstackQueryClient}>
      <BrowserRouter>
        {isAuthenticated ? (
          <div className="flex min-h-screen bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Navbar />
              <main className="flex-1 overflow-auto">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <ProtectedRoute>
                        <UsersPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </div>
        ) : (
          <Routes>
            <Route
              path="/auth/login"
              element={
                <Suspense
                  fallback={<PageLoading message="Loading login page..." />}
                >
                  <LoginPage />
                </Suspense>
              }
            />
            <Route
              path="/auth/signup"
              element={
                <Suspense
                  fallback={<PageLoading message="Loading signup page..." />}
                >
                  <SignupPage />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/auth/login" replace />} />
          </Routes>
        )}
      </BrowserRouter>
    </TanstackQueryClientProvider>
  );
};

export default App;
