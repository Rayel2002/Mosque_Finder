import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { useTheme } from "../hooks/useTheme.js"; // Importeer de useTheme-hook
import { authenticateUser } from "../components/Authenticate.js"; // Importeer de authenticateUser-functie
import { useNavigation } from "@react-navigation/native"; // Importeer de useNavigation-hook
import { themes } from "../utils/Themes.js"; // Importeer beschikbare thema's

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme(); // Haal het huidige thema op en de functie om het thema te wisselen
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Staat voor authenticatiestatus
  const [showThemes, setShowThemes] = useState(false); // Staat om te bepalen of de thema's moeten worden weergegeven
  const navigation = useNavigation(); // Haal het navigatie-object op
  const animation = useRef(new Animated.Value(0)).current; // Animatiewaarde voor het tonen van de thema's

  // useEffect om de gebruiker te authenticeren bij het laden van het scherm
  useEffect(() => {
    const authenticate = async () => {
      try {
        const isAuthenticated = await authenticateUser(); // Probeer de gebruiker te authenticeren
        setIsAuthenticated(isAuthenticated);
        if (!isAuthenticated) {
          throw new Error("Authenticatie mislukt");
        }
      } catch (error) {
        Alert.alert("Authenticatie fout", error.message, [{ text: "OK" }]);
        navigation.navigate("AuthFailed"); // Navigeer naar een scherm wanneer authenticatie mislukt
      }
    };
    authenticate();
  }, []);

  // Functie om het thema te wijzigen
  const handleThemeChange = (selectedTheme) => {
    toggleTheme(selectedTheme); // Wissel het thema
    setShowThemes(false); // Sluit de thema-selectie
    // Start de animatie om het thema te tonen
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Functie om te wisselen tussen het tonen en verbergen van de thema's
  const toggleShowThemes = () => {
    setShowThemes(!showThemes);
    // Start de animatie om het thema te tonen of te verbergen
    Animated.timing(animation, {
      toValue: showThemes ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Interpolatie voor de schaal van de animatie
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  // Interpolatie voor de transparantie van de animatie
  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Bepaal het huidige thema op basis van de achtergrondkleur en tekstkleur
  const currentThemeKey = Object.keys(themes).find(
    (key) =>
      themes[key].backgroundColor === theme.backgroundColor &&
      themes[key].textColor === theme.textColor
  );

  const currentThemeName = currentThemeKey
    ? themes[currentThemeKey].name
    : "Onbekend"; // Toon 'Onbekend' als het thema niet herkend wordt

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {isAuthenticated ? ( // Controleer of de gebruiker geauthenticeerd is
        <>
          <TouchableOpacity
            style={[
              styles.selectThemeButton,
              { backgroundColor: theme.buttonColor },
            ]}
            onPress={toggleShowThemes} // Toon of verberg de beschikbare thema's
          >
            <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>
              {`Huidig Thema: ${currentThemeName}`}
            </Text>
          </TouchableOpacity>
          <Animated.View
            style={[
              styles.scrollContainer,
              { transform: [{ scale }], opacity },
            ]}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollView}
            >
              {Object.keys(themes).map((key) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.themeSquare,
                    theme.backgroundColor === themes[key].backgroundColor &&
                      styles.selectedTheme, // Geef een rand aan het geselecteerde thema
                  ]}
                  onPress={() => handleThemeChange(key)} // Wissel naar het geselecteerde thema
                >
                  {themes[key].colors.map((color, index) => (
                    <View
                      key={index}
                      style={[styles.colorBlock, { backgroundColor: color }]}
                    />
                  ))}
                  <Text
                    style={[styles.themeText, { color: themes[key].textColor }]}
                  >
                    {themes[key].name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </>
      ) : (
        <Text style={[styles.text, { color: theme.textColor }]}>
          Authenticatie vereist om instellingen te wijzigen.
        </Text>
      )}
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  selectThemeButton: {
    width: width * 0.9,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
  },
  scrollContainer: {
    height: 120, // Stel een vaste hoogte in om layoutproblemen te voorkomen
  },
  scrollView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  themeSquare: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  colorBlock: {
    flex: 1,
    width: "100%",
  },
  themeText: {
    position: "absolute",
    bottom: 5,
    fontSize: 14,
    textAlign: "center",
  },
  selectedTheme: {
    borderWidth: 2,
    borderColor: "#6200ee",
  },
});

export default SettingsScreen;
