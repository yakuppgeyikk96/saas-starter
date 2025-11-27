import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import { useAuthStore } from "./stores/authStore";

const App = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md p-6">
          <Routes>
            <Route
              path="/auth/login"
              element={
                <div>
                  <h1 className="text-2xl font-bold mb-6 text-center">
                    Sign In
                  </h1>
                  <LoginForm />
                </div>
              }
            />
            <Route
              path="/auth/signup"
              element={
                <div>
                  <h1 className="text-2xl font-bold mb-6 text-center">
                    Sign Up
                  </h1>
                  <SignupForm />
                </div>
              }
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/auth/login" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to="/auth/login" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
