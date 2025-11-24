import { HomeIcon, UsersIcon } from "@repo/ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useSidebarStore } from "../../stores/sidebarStore";

const Sidebar = () => {
  const location = useLocation();
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  const navItems = [
    { path: "/", label: "Dashboard", icon: HomeIcon },
    { path: "/users", label: "Users", icon: UsersIcon },
  ];

  return (
    <aside
      className={`bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="h-16 flex items-center justify-center">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-sidebar-primary">
            SaaS Starter
          </h1>
        )}
      </div>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center ${isCollapsed ? "justify-center" : "justify-start"} gap-3 px-4 py-2 rounded-sm transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span>
                    <item.icon />
                  </span>
                  {!isCollapsed && <span>{item.label}</span>}
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
