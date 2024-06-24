import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { loadAsync } from "expo-font";
import { fetchData } from "../utils/FetchApi.js";
import { useTheme } from "../context/ThemeContext"; // Import useTheme hook

// Prevent the splash screen from auto hiding
preventAutoHideAsync();

const SplashScreenComponent = () => {
  const { theme } = useTheme(); // Get the current theme
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await fetchData();
        await loadAsync(Entypo.font);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]} onLayout={onLayoutRootView}>
      <Text style={[styles.text, { color: theme.textColor }]}>SplashScreen Demo! 👋</Text>
      <Entypo name="rocket" size={30} color={theme.textColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 18
  }
});

export default SplashScreenComponent;
