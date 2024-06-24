import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { requestForegroundPermissionsAsync } from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook

const PermissionsDeniedScreen = () => {
  const { theme } = useTheme(); // Get the current theme
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
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.errorText, { color: theme.textColor }]}>Permission Denied</Text>
      <Text style={[styles.text, { color: theme.textColor }]}>
        Location permission is required to use this app. Enable location permissions in your device settings.
      </Text>
      <Button title="Retry" onPress={handleRetry} color={theme.buttonColor} />
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
