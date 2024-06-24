import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './app/hooks/useTheme.js';
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
