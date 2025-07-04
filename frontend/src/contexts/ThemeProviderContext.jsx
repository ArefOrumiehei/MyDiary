import { createContext, useContext, useEffect, useState } from "react";

const THEMES = ["neutral", "happy", "sad"];
const ThemeCtx = createContext();

export function ThemeProviderContext({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "neutral");

  useEffect(() => {
    document.body.classList.remove(...THEMES.map(t => "theme-" + t));
    document.body.classList.add("theme-" + theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeCtx);
