import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./app/screens/HomeScreen.js";
import MapScreen from "./app/screens/MapScreen.js";
import SettingsScreen from "./app/screens/SettingsScreen.js";
import HotspotListScreen from "./app/screens/HotSpotScreen.js";
import { ThemeProvider } from "./app/context/ThemeContext.js";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="HotspotList" component={HotspotListScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  tab: {
    color: "red",
  },
});
