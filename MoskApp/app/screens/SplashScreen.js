import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen"; // Importeer functies voor het beheren van het splash screen
import { loadAsync } from "expo-font"; // Importeer functie om fonts asynchroon te laden
import { fetchData } from "../utils/FetchApi.js"; // Importeer fetchData functie om gegevens op te halen
import { useTheme } from "../hooks/useTheme.js"; // Importeer de useTheme-hook

// Voorkom dat het splash screen automatisch wordt verborgen
preventAutoHideAsync();

const SplashScreenComponent = () => {
  const { theme } = useTheme(); // Haal het huidige thema op
  const [appIsReady, setAppIsReady] = useState(false); // Houd bij of de app klaar is om te starten

  useEffect(() => {
    async function prepare() {
      try {
        await fetchData(); // Haal benodigde gegevens op
        await loadAsync({
          Entypo: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Entypo.ttf") // Laad het benodigde font
        });
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wacht 5000ms (5 seconden)
      } catch (e) {
        console.warn(e); // Log eventuele fouten
      } finally {
        setAppIsReady(true); // Zet appIsReady op true wanneer de voorbereiding is voltooid
      }
    }
    prepare();
  }, []);

  // Callback om het splash screen te verbergen wanneer de app klaar is
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await hideAsync(); // Verberg het splash screen
    }
  }, [appIsReady]);

  // Toon niets totdat de app klaar is
  if (!appIsReady) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]} onLayout={onLayoutRootView}>
      <Image
        source={require('../assets/mosque-icon.png')} // Voeg hier je moskee-icoon afbeelding toe
        style={styles.icon}
      />
      <Text style={[styles.text, { color: theme.textColor }]}>Welkom bij Mosque Finder! 🕌</Text>
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
