import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { requestForegroundPermissionsAsync } from 'expo-location';
import { useNavigation } from '@react-navigation/native';

// Definieer de PermissionsHandler component
const PermissionsHandler = ({ onPermissionsGranted }) => {
  const navigation = useNavigation();

  useEffect(() => {
    requestPermissions(); // Vraag permissies aan bij het laden van de component
  }, []);

  // Functie om locatietoestemmingen aan te vragen
  const requestPermissions = async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // Als toestemming niet is verleend, toon een waarschuwing en navigeer naar de PermissionsDenied scherm
        Alert.alert(
          'Toestemming geweigerd',
          'Locatietoestemming is vereist om deze app te gebruiken. Schakel locatietoestemmingen in via de instellingen van uw apparaat.',
          [{ text: 'OK' }]
        );
        navigation.navigate('PermissionsDenied', { onRetry: requestPermissions });
        return;
      }
      onPermissionsGranted(); // Roep de callback functie aan als de toestemming is verleend
    } catch (error) {
      // Toon een foutmelding als er iets misgaat bij het aanvragen van de toestemming
      Alert.alert(
        'Fout',
        `Er is een fout opgetreden bij het aanvragen van toestemmingen: ${error.message}`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    // Weergave van een bericht terwijl de permissies worden aangevraagd
    <View style={styles.container}>
      <Text style={styles.text}>Toestemmingen aanvragen...</Text>
    </View>
  );
};

// Stijlen voor de PermissionsHandler component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
  },
});

export default PermissionsHandler;
