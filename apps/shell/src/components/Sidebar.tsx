import { HomeIcon, UsersIcon } from "@repo/ui/icons";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: HomeIcon },
    { path: "/users", label: "Users", icon: UsersIcon },
  ];

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="h-16 flex items-center justify-center">
        <h1 className="text-xl font-bold text-sidebar-primary">SaaS Starter</h1>
      </div>
      <nav>
        <ul className="space-y-2 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <span>
                    <item.icon />
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
