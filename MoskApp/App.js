import React from 'react';
import PermissionsNavigator from './app/routes/PermissionsNavigator.js';
import { ThemeProvider } from './app/context/ThemeContext.js';

const App = () => {
  return (
    <ThemeProvider>
      <PermissionsNavigator />
    </ThemeProvider>
  );
};

export default App;

