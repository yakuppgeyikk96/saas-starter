import { MoonIcon, SunIcon } from "@repo/ui/icons";
import { useThemeStore } from "../../stores/themeStore";

const ThemeToggler = () => {
  const { theme, toggle } = useThemeStore();

  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <MoonIcon className="w-5 h-5 text-foreground" />
      ) : (
        <SunIcon className="w-5 h-5 text-foreground" />
      )}
    </button>
  );
};

export default ThemeToggler;
