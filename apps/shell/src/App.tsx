import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Navbar, Sidebar } from "./components/layout";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
