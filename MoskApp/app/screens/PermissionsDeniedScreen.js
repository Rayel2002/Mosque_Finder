import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { requestForegroundPermissionsAsync } from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme'; // Importeer de useTheme-hook

const PermissionsDeniedScreen = () => {
  const { theme } = useTheme(); // Haal het huidige thema op
  const navigation = useNavigation(); // Haal de navigatie object op

  // Functie om de machtiging opnieuw aan te vragen
  const handleRetry = async () => {
    const { status } = await requestForegroundPermissionsAsync(); // Vraag locatie machtigingen aan
    if (status === 'granted') { // Controleer of de machtiging is verleend
      navigation.replace('Main'); // Vervang de huidige scherm met het 'Main' scherm
    } else {
      // Toon een alert als de machtiging nog steeds is geweigerd
      Alert.alert('Machtiging geweigerd', 'Locatiemachtiging is nog steeds geweigerd. Schakel locatiemachtigingen in via de instellingen van uw apparaat.', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.errorText, { color: theme.textColor }]}>Machtiging Geweigerd</Text>
      <Text style={[styles.text, { color: theme.textColor }]}>
        Locatiemachtiging is vereist om deze app te gebruiken. Schakel locatiemachtigingen in via de instellingen van uw apparaat.
      </Text>
      <Button title="Opnieuw Proberen" onPress={handleRetry} color={theme.buttonColor} /> {/* Knop om opnieuw te proberen de machtiging aan te vragen */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default PermissionsDeniedScreen;
