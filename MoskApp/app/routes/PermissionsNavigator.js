import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { requestForegroundPermissionsAsync } from 'expo-location';
import PermissionsDeniedScreen from '../screens/PermissionsDeniedScreen.js';
import AppStack from './AppStack.js';

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
    <Stack.Navigator>
      {permissionsGranted === null ? (
        <Stack.Screen name="Loading" component={() => null} />
      ) : permissionsGranted ? (
        <Stack.Screen name="Main" component={AppStack} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="PermissionsDenied" component={PermissionsDeniedScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default PermissionsNavigator;
