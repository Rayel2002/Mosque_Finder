import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { requestForegroundPermissionsAsync } from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const PermissionsHandler = ({ onPermissionsGranted }) => {
  const navigation = useNavigation();

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Toestemming geweigerd',
          'Locatietoestemming is vereist om deze app te gebruiken. Schakel locatietoestemmingen in via de instellingen van uw apparaat.',
          [{ text: 'OK' }]
        );
        navigation.navigate('PermissionsDenied', { onRetry: requestPermissions });
        return;
      }
      onPermissionsGranted();
    } catch (error) {
      Alert.alert(
        'Fout',
        `Er is een fout opgetreden bij het aanvragen van toestemmingen: ${error.message}`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Toestemmingen aanvragen...</Text>
    </View>
  );
};

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
