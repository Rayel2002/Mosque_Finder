import React, { createContext, useState, useContext } from 'react';
import { themes } from '../utils/Themes.js';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = (selectedTheme) => {
    setTheme(themes[selectedTheme]);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
