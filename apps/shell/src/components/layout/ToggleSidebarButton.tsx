import { MenuIcon } from "@repo/ui/icons";
import { useSidebarStore } from "../../stores/sidebarStore";

const ToggleSidebarButton = () => {
  const toggleSidebar = useSidebarStore((state) => state.toggle);

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
      aria-label="Toggle sidebar"
    >
      <MenuIcon className="w-5 h-5 text-foreground" />
    </button>
  );
};

export default ToggleSidebarButton;
