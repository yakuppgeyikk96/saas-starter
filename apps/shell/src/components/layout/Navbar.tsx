import ProfileMenu from "../ProfileMenu";
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
        <ProfileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
