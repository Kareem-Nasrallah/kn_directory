"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-1 bg-foreground dark:bg-gray-700 text-gray-800 dark:text-gray-100 cursor-pointer rounded-xl"
    >
      {theme === "dark" ? <SunIcon className="size-7"/> : <MoonIcon className="text-white size-7" />}
    </button>
  );
}
