// Importeer de benodigde modules en componenten van React en het themes bestand
import React, { createContext, useState, useContext } from 'react';
import { themes } from '../utils/Themes.js';

// Maak een context aan voor thema-beheer
const ThemeContext = createContext();

// Maak een ThemeProvider component die de applicatie omhult en de thema-context aanbiedt
export const ThemeProvider = ({ children }) => {
  // Definieer een state variabele voor het huidige thema, geïnitialiseerd met het lichte thema
  const [theme, setTheme] = useState(themes.light);

  // Functie om het thema te wisselen op basis van het geselecteerde thema
  const toggleTheme = (selectedTheme) => {
    setTheme(themes[selectedTheme]);
  };

  // Bied het thema en de toggleTheme functie aan de kinderen van de ThemeProvider
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Maak een custom hook om de ThemeContext te gebruiken
export const useTheme = () => useContext(ThemeContext);
