import React, { createContext, useState, useContext } from "react";
import {
  lightTheme,
  darkTheme,
  deuteranopiaTheme,
  protanopiaTheme,
  tritanopiaTheme,
  // Import other themes
} from "../utils/Themes.js";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = (selectedTheme) => {
    switch (selectedTheme) {
      case "light":
        setTheme(lightTheme);
        break;
      case "dark":
        setTheme(darkTheme);
        break;
      case "deuteranopia":
        setTheme(deuteranopiaTheme);
        break;
      case "protanopia":
        setTheme(protanopiaTheme);
        break;
      case "tritanopia":
        setTheme(tritanopiaTheme);
        break;
      // Add more cases as needed
      default:
        setTheme(lightTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
