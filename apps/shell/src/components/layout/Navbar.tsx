import { UserIcon } from "@repo/ui/icons";
import ThemeToggler from "./ThemeToggler";
import ToggleSidebarButton from "./ToggleSidebarButton";

const Navbar = () => {
  return (
    <nav className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
      <div className="flex items-center">
        <ToggleSidebarButton />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggler />
        <button
          type="button"
          className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Profile"
        >
          <UserIcon className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
