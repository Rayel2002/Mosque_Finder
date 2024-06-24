import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { requestForegroundPermissionsAsync } from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const PermissionsHandler = ({ onPermissionsGranted }) => {
  const navigation = useNavigation();

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      navigation.navigate('PermissionsDenied', { onRetry: requestPermissions });
      return;
    }

    // If we reach here, all permissions are granted
    onPermissionsGranted();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Requesting Permissions...</Text>
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
