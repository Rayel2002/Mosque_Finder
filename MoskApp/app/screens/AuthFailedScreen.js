import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AuthFailedScreen = () => {
  const navigation = useNavigation();

  const handleRetry = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Authentication Failed</Text>
      <Button title="Retry" onPress={handleRetry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 20,
    color: "red",
    marginBottom: 20,
  },
});

export default AuthFailedScreen;
