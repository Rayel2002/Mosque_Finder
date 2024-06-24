import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext"; // Import useTheme hook

const AuthFailedScreen = () => {
  const { theme } = useTheme(); // Get the current theme
  const navigation = useNavigation();

  const handleRetry = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.errorText, { color: theme.textColor }]}>Authentication Failed</Text>
      <Button title="Retry" onPress={handleRetry} color={theme.buttonColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default AuthFailedScreen;
