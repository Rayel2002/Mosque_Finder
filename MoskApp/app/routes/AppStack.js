import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen.js';
import MapScreen from '../screens/MapScreen.js';
import SettingsScreen from '../screens/SettingsScreen.js';
import HotspotScreen from '../screens/HotSpotScreen.js';
import AuthFailedScreen from '../screens/AuthFailedScreen.js';
import { useTheme } from '../context/ThemeContext.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SettingsStack = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="SettingsMain"
      screenOptions={{
        headerStyle: { backgroundColor: theme.backgroundColor },
        headerTintColor: theme.textColor,
      }}
    >
      <Stack.Screen name="SettingsMain" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AuthFailed" component={AuthFailedScreen} />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.backgroundColor },
        tabBarActiveTintColor: theme.buttonColor,
        tabBarInactiveTintColor: theme.textColor,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="HotspotList" component={HotspotScreen} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppStack;
