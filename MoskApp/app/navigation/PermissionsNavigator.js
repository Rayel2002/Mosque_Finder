import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { requestForegroundPermissionsAsync } from 'expo-location';
import PermissionsDeniedScreen from '../screens/PermissionsDeniedScreen.js';
import AppStack from './AppStack.js';
import { useTheme } from '../hooks/useTheme.js';

const Stack = createStackNavigator();

const PermissionsNavigator = () => {
  const { theme } = useTheme();
  const [permissionsGranted, setPermissionsGranted] = useState(null);

  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      setPermissionsGranted(status === 'granted');
    };

    checkPermissions();
  }, []);

  if (permissionsGranted === null) {
    return <LoadingScreen />; // Avoid inline function for component
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.backgroundColor },
        headerTintColor: theme.textColor,
      }}
    >
      {permissionsGranted ? (
        <Stack.Screen name="Home" component={AppStack} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="PermissionsDenied" component={PermissionsDeniedScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

const LoadingScreen = () => {
  return null; // This can be replaced with an actual loading component if needed
};

export default PermissionsNavigator;
