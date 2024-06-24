import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { requestForegroundPermissionsAsync } from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const PermissionsDeniedScreen = () => {
  const navigation = useNavigation();

  const handleRetry = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === 'granted') {
      navigation.replace('Main');
    } else {
      Alert.alert('Permission denied', 'Location permission is still denied. Enable location permissions in your device settings.', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Permission Denied</Text>
      <Text style={styles.text}>Location permission is required to use this app. Enable location permissions in your device settings.</Text>
      <Button title="Retry" onPress={handleRetry} />
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
  errorText: {
    fontSize: 20,
    color: 'red',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default PermissionsDeniedScreen;
