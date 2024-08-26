import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../hooks/useTheme"; // Importeer de useTheme hook

const AuthFailedScreen = () => {
  const { theme } = useTheme(); // Haal het huidige thema op
  const navigation = useNavigation();

  // Functie om opnieuw te proberen door naar het instellingen scherm te navigeren
  const handleRetry = () => {
    navigation.navigate("Settings");
  };

  return (
    // Container view met dynamische achtergrondkleur gebaseerd op het huidige thema
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Tekst die de foutmelding weergeeft, met dynamische tekstkleur */}
      <Text style={[styles.errorText, { color: theme.textColor }]}>Authenticatie Mislukt</Text>
      {/* Knop om opnieuw te proberen, met dynamische knopkleur */}
      <Button title="Opnieuw Proberen" onPress={handleRetry} color={theme.buttonColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Zorgt ervoor dat de container de volledige hoogte van het scherm inneemt
    justifyContent: "center", // Centreert de inhoud verticaal
    alignItems: "center", // Centreert de inhoud horizontaal
  },
  errorText: {
    fontSize: 20, // Lettergrootte van de foutmelding
    marginBottom: 20, // Ruimte onder de foutmelding
  },
});

export default AuthFailedScreen;
