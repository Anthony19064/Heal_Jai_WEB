import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const stored = localStorage.getItem("themeColor") || "Red";
  const [theme, setTheme] = useState(stored);

  useEffect(() => {
    localStorage.setItem("themeColor", theme);
    document.body.setAttribute("data-theme", theme); 
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
