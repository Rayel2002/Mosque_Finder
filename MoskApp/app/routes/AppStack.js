import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../screens/MapScreen.js";
import SettingsScreen from "../screens/SettingsScreen.js";
import HotspotScreen from "../screens/HotSpotScreen.js";
import AuthFailedScreen from "../screens/AuthFailedScreen.js";
import { useTheme } from "../context/ThemeContext.js";
import { Ionicons } from "@expo/vector-icons"; // Import icons from @expo/vector-icons

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getHeaderColor = (theme) => {
  if (theme.name === 'Dark' || theme.name === 'Deuteranopia' || theme.name === 'Protanopia') {
    return theme.colors[2]; // Use the third color for Dark and Deuteranopia themes
  } else if (theme.name === 'Tritanopia') {
    return theme.colors[3]; // Use the third color for Dark and Deuteranopia themes
  } else {
    return theme.colors[theme.colors.length - 1]; // Use the last color for other themes
  }
};

const SettingsStack = () => {
  const { theme } = useTheme();
  const headerColor = getHeaderColor(theme);

  return (
    <Stack.Navigator
      initialRouteName="SettingsMain"
      screenOptions={{
        headerStyle: { backgroundColor: headerColor },
        headerTintColor: theme.textColor,
      }}
    >
      <Stack.Screen
        name="SettingsMain"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AuthFailed" component={AuthFailedScreen} />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  const { theme } = useTheme();
  const headerColor = getHeaderColor(theme);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Hotspots") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.buttonColor,
        tabBarInactiveTintColor: theme.textColor,
        tabBarStyle: { backgroundColor: headerColor, paddingTop: 10, paddingBottom: 10 }, // Add padding to the tab bar
        headerStyle: { backgroundColor: headerColor },
        headerTintColor: theme.textColor,
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Hotspots" component={HotspotScreen} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  const { theme } = useTheme();
  const headerColor = getHeaderColor(theme);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: headerColor },
        headerTintColor: theme.textColor,
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
