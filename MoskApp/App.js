import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './app/context/ThemeContext.js';
import PermissionsNavigator from './app/routes/PermissionsNavigator.js';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <PermissionsNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
