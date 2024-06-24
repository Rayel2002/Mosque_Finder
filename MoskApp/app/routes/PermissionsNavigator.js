import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PermissionsDeniedScreen from '../screens/PermissionsDeniedScreen.js';
import { requestForegroundPermissionsAsync } from 'expo-location';
import AppStack from './AppStack.js';  // Assume AppStack is exported from another file

const Stack = createStackNavigator();

const PermissionsNavigator = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(null);

  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      setPermissionsGranted(status === 'granted');
    };

    checkPermissions();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {permissionsGranted === null ? (
          // Loading state can be handled here
          <Stack.Screen name="Loading" component={() => null} />
        ) : permissionsGranted ? (
          <Stack.Screen name="Main" component={AppStack} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="PermissionsDenied" component={PermissionsDeniedScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PermissionsNavigator;
