import { hasHardwareAsync, supportedAuthenticationTypesAsync, authenticateAsync, AuthenticationType } from "expo-local-authentication";
import { Alert } from "react-native";

export const authenticateUser = async () => {
  try {
    const hasHardware = await hasHardwareAsync();
    const supported = await supportedAuthenticationTypesAsync();

    if (!hasHardware || supported.length === 0) {
      Alert.alert("Authentication error", "No supported authentication methods available.");
      return false;
    }

    for (let attempt = 1; attempt <= 3; attempt++) {
      let authResult;
      if (supported.includes(AuthenticationType.FACIAL_RECOGNITION)) {
        authResult = await authenticateAsync({
          promptMessage: "Authenticate with Face ID",
          fallbackLabel: "Use Passcode",
          cancelLabel: "Cancel",
        });
      } else {
        authResult = await authenticateAsync();
      }

      if (authResult.success) {
        return true;
      } else {
        Alert.alert("Authentication failed", `Attempt ${attempt} of 3 failed. Please try again.`);
        if (attempt === 3) {
          Alert.alert("Authentication error", "Maximum attempts reached. Please try again later.");
          return false;
        }
      }
    }
  } catch (error) {
    Alert.alert("Authentication error", error.message);
    return false;
  }
};
