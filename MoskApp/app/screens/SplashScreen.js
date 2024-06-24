import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { loadAsync } from "expo-font";
import { fetchData } from "../utils/FetchApi.js";
import { useTheme } from "../hooks/useTheme.js"; // Import useTheme hook

// Prevent the splash screen from auto hiding
preventAutoHideAsync();

const SplashScreenComponent = () => {
  const { theme } = useTheme(); // Get the current theme
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await fetchData();
        await loadAsync({
          Entypo: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Entypo.ttf")
        });
        await new Promise(resolve => setTimeout(resolve, 5000)); // Set timeout to 5000ms (5 seconds)
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
      <Image
        source={require('../assets/mosque-icon.png')} // Add your mosque icon image here
        style={styles.icon}
      />
      <Text style={[styles.text, { color: theme.textColor }]}>Welcome to Mosque Finder! 🕌</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  icon: {
    width: 100,
    height: 100,
  },
});

export default SplashScreenComponent;
