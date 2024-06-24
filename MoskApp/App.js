import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from "./app/context/ThemeContext.js";
import HomeScreen from "./app/screens/HomeScreen.js";
import MapScreen from "./app/screens/MapScreen.js";
import SettingsScreen from "./app/screens/SettingsScreen.js";
import HotspotListScreen from "./app/screens/HotSpotScreen.js";
import AuthFailedScreen from "./app/screens/AuthFailedScreen.js";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SettingsStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="AuthFailed" component={AuthFailedScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="HotspotList" component={HotspotListScreen} />
          <Tab.Screen name="Settings" component={SettingsStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
