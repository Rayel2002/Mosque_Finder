import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PermissionsDeniedScreen = () => {
  const navigation = useNavigation();
  const { params: { onRetry } } = useRoute();

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Permissions Denied</Text>
      <Text style={styles.text}>You need to grant location permissions to use this app.</Text>
      <Button title="Retry" onPress={onRetry} />
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
