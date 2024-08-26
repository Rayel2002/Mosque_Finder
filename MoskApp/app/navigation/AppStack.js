import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import MapScreen from "../screens/MapScreen.js";
import SettingsScreen from "../screens/SettingsScreen.js";
import HotspotScreen from "../screens/HotSpotScreen.js";
import AuthFailedScreen from "../screens/AuthFailedScreen.js";
import { useTheme } from "../hooks/useTheme.js";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Component voor de logo-afbeelding in de header
const LogoTitle = () => {
  return (
    <Image
      source={require("../img/mosque-icon.png")}
      style={{ width: 50, height: 50, marginBottom: 15 }}
    />
  );
};

// Functie om de headerkleur te bepalen op basis van het huidige thema
const getHeaderColor = (theme) => {
  if (
    theme.name === "Dark" ||
    theme.name === "Deuteranopia" ||
    theme.name === "Protanopia"
  ) {
    return theme.colors[2]; // Gebruik de derde kleur voor Dark en Deuteranopia thema's
  } else if (theme.name === "Tritanopia") {
    return theme.colors[3];
  } else {
    return theme.colors[theme.colors.length - 1]; // Gebruik de laatste kleur voor andere thema's
  }
};

// Stack-navigator voor de instellingen en authenticatie fouten
const SettingsStack = () => {
  const { theme } = useTheme(); // Verkrijg het huidige thema
  const headerColor = getHeaderColor(theme); // Bepaal de headerkleur op basis van het thema

  return (
    <Stack.Navigator
      initialRouteName="SettingsMain" // Start met de SettingsMain scherm
      screenOptions={{
        headerStyle: { backgroundColor: headerColor }, // Stel de achtergrondkleur van de header in
        headerTintColor: theme.textColor, // Stel de kleur van de header-tekst in
        headerTitle: () => <LogoTitle />, // Stel de logo als de titel van de header in
      }}
      options={{ headerShown: false }}
    >
      <Stack.Screen
        name="SettingsMain"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AuthFailed"
        component={AuthFailedScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Tab-navigator voor de hoofdschermen
const MainTabNavigator = () => {
  const { theme } = useTheme(); // Verkrijg het huidige thema
  const headerColor = getHeaderColor(theme); // Bepaal de headerkleur op basis van het thema

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Stel de iconen in voor elke tab
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
        tabBarActiveTintColor: theme.buttonColor, // Kleur voor actieve tab
        tabBarInactiveTintColor: theme.textColor, // Kleur voor inactieve tab
        tabBarStyle: {
          backgroundColor: headerColor,
          paddingTop: 10,
          paddingBottom: 10,
        }, // Voeg padding toe aan de tab bar
        headerStyle: { backgroundColor: headerColor }, // Stel de achtergrondkleur van de header in
        headerTintColor: theme.textColor, // Stel de kleur van de header-tekst in
        headerTitle: () => <LogoTitle />, // Stel de logo als de titel van de header in
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Hotspots" component={HotspotScreen} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

// Hoofd Stack-navigator die de tab navigatie omhult
const AppStack = () => {
  const { theme } = useTheme(); // Verkrijg het huidige thema
  const headerColor = getHeaderColor(theme); // Bepaal de headerkleur op basis van het thema

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: headerColor }, // Stel de achtergrondkleur van de header in
        headerTintColor: theme.textColor, // Stel de kleur van de header-tekst in
        headerTitle: () => <LogoTitle />, // Stel de logo als de titel van de header in
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }} // Verberg de header voor de tab navigator
      />
    </Stack.Navigator>
  );
};

export default AppStack;
