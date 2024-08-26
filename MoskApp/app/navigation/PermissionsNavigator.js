import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { requestForegroundPermissionsAsync } from 'expo-location';
import PermissionsDeniedScreen from '../screens/PermissionsDeniedScreen.js';
import AppStack from './AppStack.js';
import { useTheme } from '../hooks/useTheme.js';

const Stack = createStackNavigator();

// Navigator voor het beheren van permissies en navigatie
const PermissionsNavigator = () => {
  const { theme } = useTheme(); // Verkrijg het huidige thema
  const [permissionsGranted, setPermissionsGranted] = useState(null); // Staat om te controleren of de permissies zijn verleend

  useEffect(() => {
    // Controleert de locatie-permissies bij het laden van de component
    const checkPermissions = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      setPermissionsGranted(status === 'granted'); // Stel in of de permissies zijn verleend
    };

    checkPermissions();
  }, []);

  if (permissionsGranted === null) {
    return <LoadingScreen />; // Vermijd inline functie voor component, kan vervangen worden door een werkelijke laadcomponent indien nodig
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.backgroundColor }, // Stel de achtergrondkleur van de header in op basis van het thema
        headerTintColor: theme.textColor, // Stel de kleur van de header-tekst in op basis van het thema
      }}
    >
      {permissionsGranted ? (
        <Stack.Screen name="Home" component={AppStack} options={{ headerShown: false }} /> // Navigeer naar AppStack als permissies zijn verleend
      ) : (
        <Stack.Screen name="PermissionsDenied" component={PermissionsDeniedScreen} options={{ headerShown: false }} /> // Navigeer naar PermissionsDeniedScreen als permissies zijn geweigerd
      )}
    </Stack.Navigator>
  );
};

// Laadscherm dat momenteel niets weergeeft, kan vervangen worden door een werkelijke laadcomponent indien nodig
const LoadingScreen = () => {
  return null; // Kan worden vervangen door een echte laadcomponent als dat nodig is
};

export default PermissionsNavigator;
